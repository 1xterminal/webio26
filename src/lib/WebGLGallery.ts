import * as THREE from 'three';
import normalizeWheel from 'normalize-wheel';
import { vertexShader, fragmentShader } from './glsl';

interface Size {
    width: number;
    height: number;
}

interface ImageInfo {
    width: number;
    height: number;
    aspectRatio: number;
    uvs: {
        xStart: number;
        xEnd: number;
        yStart: number;
        yEnd: number;
    };
}

export default class WebGLGallery {
    container: HTMLElement;
    canvas: HTMLCanvasElement;
    scene!: THREE.Scene;
    camera!: THREE.PerspectiveCamera;
    renderer!: THREE.WebGLRenderer;
    sizes: Size = { width: 0, height: 0 };
    dimensions = { width: 0, height: 0, pixelRatio: 1 };

    time: number = 0;
    clock: THREE.Clock;

    geometry!: THREE.PlaneGeometry;
    material!: THREE.ShaderMaterial;
    mesh!: THREE.InstancedMesh;
    meshCount: number;

    imageInfos: ImageInfo[] = [];
    atlasTexture: THREE.Texture | null = null;
    blurryAtlasTexture: THREE.Texture | null = null;

    shaderParameters = { maxX: 0, maxY: 0 };

    drag = {
        xCurrent: 0, xTarget: 0,
        yCurrent: 0, yTarget: 0,
        isDown: false,
        startX: 0, startY: 0,
        lastX: 0, lastY: 0,
        direction: 'undecided' as 'undecided' | 'horizontal' | 'vertical',
    };
    dragSensitivity: number = 1.5;
    dragDamping: number = 0.1;
    directionLockThreshold: number = 8; // px before deciding direction

    scrollY = { target: 0, current: 0, direction: 0 };

    // Pinch-to-zoom state
    pinch = {
        active: false,
        startDistance: 0,
        lastDistance: 0,
    };

    isTouchDevice: boolean = false;

    animationFrameId: number = 0;
    isHovered: boolean = false;
    isInView: boolean = true;
    observer!: IntersectionObserver;

    // Binded methods for cleanup
    private boundOnResize: () => void;
    private boundOnWheel: (e: WheelEvent) => void;
    private boundOnPointerMove: (e: PointerEvent) => void;
    private boundOnPointerUp: (e: PointerEvent) => void;
    private boundOnTouchStart: (e: TouchEvent) => void;
    private boundOnTouchMove: (e: TouchEvent) => void;
    private boundOnTouchEnd: () => void;

    constructor(container: HTMLElement, canvas: HTMLCanvasElement) {
        this.container = container;
        this.canvas = canvas;
        this.clock = new THREE.Clock();

        // Responsive mesh count for mobile performance
        this.meshCount = window.innerWidth < 768 ? 80 : 200;

        // Detect touch device
        this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        this.boundOnResize = this.onResize.bind(this);
        this.boundOnWheel = this.onWheel.bind(this);
        this.boundOnPointerMove = this.onPointerMove.bind(this);
        this.boundOnPointerUp = this.onPointerUp.bind(this);
        this.boundOnTouchStart = this.onTouchStart.bind(this);
        this.boundOnTouchMove = this.onTouchMove.bind(this);
        this.boundOnTouchEnd = this.onTouchEnd.bind(this);

        this.init();
    }

    async init() {
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.setSizes();

        this.shaderParameters = {
            maxX: this.sizes.width * 2,
            maxY: this.sizes.height * 2,
        };

        this.createGeometry();
        this.createMaterial();
        this.createInstancedMesh();

        // Setup interactions
        this.addEventListeners();
        this.bindDrag(this.canvas);

        // Fetch and apply images
        await this.fetchCovers();

        // Setup Intersection Observer to pause when off-screen
        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (!this.isInView) {
                    this.isInView = true;
                    this.time = this.clock.getElapsedTime(); // reset time to prevent huge delta jumps
                    this.renderLoop();
                }
            } else {
                this.isInView = false;
                cancelAnimationFrame(this.animationFrameId);
            }
        }, { rootMargin: '200px' });
        this.observer.observe(this.container);

        // Start loop (will only run if isInView)
        if (this.isInView) {
            this.renderLoop();
        }
    }

    createScene() {
        this.scene = new THREE.Scene();
    }

    createCamera() {
        const { clientWidth, clientHeight } = this.container;
        this.camera = new THREE.PerspectiveCamera(75, clientWidth / clientHeight, 0.1, 100);
        this.scene.add(this.camera);
        this.camera.position.z = 10;
    }

    createRenderer() {
        const { clientWidth, clientHeight } = this.container;
        this.dimensions = {
            width: clientWidth,
            height: clientHeight,
            pixelRatio: Math.min(2, window.devicePixelRatio),
        };

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true,
        });
        this.renderer.setSize(this.dimensions.width, this.dimensions.height);
        this.renderer.setPixelRatio(this.dimensions.pixelRatio);
    }

    setSizes() {
        const fov = this.camera.fov * (Math.PI / 180);
        const height = this.camera.position.z * Math.tan(fov / 2) * 2;
        const width = height * this.camera.aspect;

        this.sizes = { width, height };
    }

    createGeometry() {
        this.geometry = new THREE.PlaneGeometry(1.295, 1, 1, 1);
        this.geometry.scale(1.8, 1.8, 1.8);
    }

    createMaterial() {
        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            transparent: true,
            uniforms: {
                uTime: { value: 0 },
                uMaxXdisplacement: { value: new THREE.Vector2(this.shaderParameters.maxX, this.shaderParameters.maxY) },
                uWrapperTexture: {
                    value: new THREE.TextureLoader().load("/photo_frame.webp", (tex) => {
                        tex.minFilter = THREE.NearestFilter;
                        tex.magFilter = THREE.NearestFilter;
                        tex.generateMipmaps = false;
                        tex.needsUpdate = true;
                    }),
                },
                uAtlas: new THREE.Uniform(null),
                uBlurryAtlas: new THREE.Uniform(null),
                uScrollY: { value: 0 },
                uSpeedY: { value: 0 },
                uDrag: { value: new THREE.Vector2(0, 0) },
            },
        });
    }

    createInstancedMesh() {
        this.mesh = new THREE.InstancedMesh(this.geometry, this.material, this.meshCount);
        this.scene.add(this.mesh);
    }

    async fetchCovers() {
        const urls: string[] = new Array(17).fill(0).map((_, i) => `/covers/image_${i}.webp`);
        await this.loadTextureAtlas(urls);
        this.createBlurryAtlas();
        this.fillMeshData();
    }

    async loadTextureAtlas(urls: string[]) {
        const imagePromises = urls.map(async (path) => {
            return await new Promise<CanvasImageSource>((resolve) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => resolve(img);
                img.onerror = () => {
                    // Placeholder fallback to avoid crashing on missing image
                    const canvas = document.createElement("canvas");
                    canvas.width = 500; canvas.height = 500;
                    const ctx = canvas.getContext("2d")!;
                    ctx.fillStyle = "#222"; ctx.fillRect(0, 0, 500, 500);
                    resolve(canvas);
                };
                img.src = path;
            });
        });

        const images = await Promise.all(imagePromises);

        const atlasWidth = Math.max(...images.map((img) => (img as HTMLCanvasElement).width));
        let totalHeight = 0;
        images.forEach((img) => { totalHeight += (img as HTMLCanvasElement).height; });

        const canvas = document.createElement("canvas");
        canvas.width = atlasWidth;
        canvas.height = totalHeight;
        const ctx = canvas.getContext("2d")!;

        let currentY = 0;
        this.imageInfos = images.map((img) => {
            const el = img as HTMLCanvasElement;
            const aspectRatio = el.width / el.height;
            ctx.drawImage(img, 0, currentY);

            const info = {
                width: el.width,
                height: el.height,
                aspectRatio,
                uvs: {
                    xStart: 0,
                    xEnd: el.width / atlasWidth,
                    yStart: 1 - currentY / totalHeight,
                    yEnd: 1 - (currentY + el.height) / totalHeight,
                },
            };

            currentY += el.height;
            return info;
        });

        this.atlasTexture = new THREE.Texture(canvas);
        this.atlasTexture.wrapS = THREE.ClampToEdgeWrapping;
        this.atlasTexture.wrapT = THREE.ClampToEdgeWrapping;
        this.atlasTexture.minFilter = THREE.LinearFilter;
        this.atlasTexture.magFilter = THREE.LinearFilter;
        this.atlasTexture.needsUpdate = true;
        this.material.uniforms.uAtlas.value = this.atlasTexture;
    }

    createBlurryAtlas() {
        if (!this.atlasTexture) return;
        const blurryCanvas = document.createElement("canvas");
        blurryCanvas.width = (this.atlasTexture.image as HTMLCanvasElement).width;
        blurryCanvas.height = (this.atlasTexture.image as HTMLCanvasElement).height;
        const ctx = blurryCanvas.getContext("2d")!;
        ctx.filter = "blur(100px)";
        ctx.drawImage(this.atlasTexture.image as CanvasImageSource, 0, 0);

        this.blurryAtlasTexture = new THREE.Texture(blurryCanvas);
        this.blurryAtlasTexture.wrapS = THREE.ClampToEdgeWrapping;
        this.blurryAtlasTexture.wrapT = THREE.ClampToEdgeWrapping;
        this.blurryAtlasTexture.minFilter = THREE.LinearFilter;
        this.blurryAtlasTexture.magFilter = THREE.LinearFilter;
        this.blurryAtlasTexture.needsUpdate = true;
        this.material.uniforms.uBlurryAtlas.value = this.blurryAtlasTexture;
    }

    fillMeshData() {
        const initialPosition = new Float32Array(this.meshCount * 3);
        const meshSpeed = new Float32Array(this.meshCount);
        const aTextureCoords = new Float32Array(this.meshCount * 4);
        const aImageAspect = new Float32Array(this.meshCount);

        for (let i = 0; i < this.meshCount; i++) {
            initialPosition[i * 3 + 0] = (Math.random() - 0.5) * this.shaderParameters.maxX * 2; // x
            initialPosition[i * 3 + 1] = (Math.random() - 0.5) * this.shaderParameters.maxY * 2; // y
            initialPosition[i * 3 + 2] = Math.random() * (7 - -30) - 30; // z

            meshSpeed[i] = Math.random() * 0.5 + 0.5;

            const imageIndex = i % this.imageInfos.length;
            aTextureCoords[i * 4 + 0] = this.imageInfos[imageIndex].uvs.xStart;
            aTextureCoords[i * 4 + 1] = this.imageInfos[imageIndex].uvs.xEnd;
            aTextureCoords[i * 4 + 2] = this.imageInfos[imageIndex].uvs.yStart;
            aTextureCoords[i * 4 + 3] = this.imageInfos[imageIndex].uvs.yEnd;
            aImageAspect[i] = this.imageInfos[imageIndex].aspectRatio;
        }

        this.geometry.setAttribute("aInitialPosition", new THREE.InstancedBufferAttribute(initialPosition, 3));
        this.geometry.setAttribute("aMeshSpeed", new THREE.InstancedBufferAttribute(meshSpeed, 1));
        this.mesh.geometry.setAttribute("aTextureCoords", new THREE.InstancedBufferAttribute(aTextureCoords, 4));
        this.mesh.geometry.setAttribute("aImageAspect", new THREE.InstancedBufferAttribute(aImageAspect, 1));
    }

    addEventListeners() {
        window.addEventListener("resize", this.boundOnResize);
        window.addEventListener("wheel", this.boundOnWheel, { passive: true });

        // Manage hover state so scroll only affects gallery speed when hovered
        this.container.addEventListener("mouseenter", () => this.isHovered = true);
        this.container.addEventListener("mouseleave", () => this.isHovered = false);

        // Pinch-to-zoom listeners for touch devices
        if (this.isTouchDevice) {
            this.canvas.addEventListener("touchstart", this.boundOnTouchStart, { passive: false });
            this.canvas.addEventListener("touchmove", this.boundOnTouchMove, { passive: false });
            this.canvas.addEventListener("touchend", this.boundOnTouchEnd);
        }
    }

    bindDrag(element: HTMLElement) {
        const onPointerDown = (e: PointerEvent) => {
            this.drag.isDown = true;
            this.drag.startX = e.clientX;
            this.drag.startY = e.clientY;
            this.drag.lastX = e.clientX;
            this.drag.lastY = e.clientY;
            this.drag.direction = 'undecided';

            // Only capture pointer on non-touch devices (mouse)
            // On touch, we let the browser handle vertical scroll natively
            if (!this.isTouchDevice) {
                element.setPointerCapture(e.pointerId);
            }
        };

        element.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("pointermove", this.boundOnPointerMove);
        window.addEventListener("pointerup", this.boundOnPointerUp);
    }

    onPointerMove(e: PointerEvent) {
        if (!this.drag.isDown) return;

        // Direction lock for touch devices
        if (this.isTouchDevice && this.drag.direction === 'undecided') {
            const totalDx = Math.abs(e.clientX - this.drag.startX);
            const totalDy = Math.abs(e.clientY - this.drag.startY);
            const maxDelta = Math.max(totalDx, totalDy);

            if (maxDelta < this.directionLockThreshold) return; // wait for enough movement

            if (totalDy > totalDx) {
                // Vertical gesture → release drag, let browser scroll
                this.drag.direction = 'vertical';
                this.drag.isDown = false;
                return;
            } else {
                // Horizontal gesture → lock to gallery drag
                this.drag.direction = 'horizontal';
            }
        }

        // If vertical was decided, do nothing
        if (this.drag.direction === 'vertical') return;

        const dx = e.clientX - this.drag.lastX;
        const dy = e.clientY - this.drag.lastY;
        this.drag.lastX = e.clientX;
        this.drag.lastY = e.clientY;

        const worldPerPixelX = (this.sizes.width / window.innerWidth) * this.dragSensitivity;

        if (this.isTouchDevice) {
            // On mobile, only allow horizontal dragging
            this.drag.xTarget += -dx * worldPerPixelX;
        } else {
            // On desktop, allow both axes
            const worldPerPixelY = (this.sizes.height / window.innerHeight) * this.dragSensitivity;
            this.drag.xTarget += -dx * worldPerPixelX;
            this.drag.yTarget += dy * worldPerPixelY;
        }
    }

    onPointerUp() {
        this.drag.isDown = false;
        this.drag.direction = 'undecided';
    }

    // --- Pinch-to-zoom for mobile ---
    private getTouchDistance(touches: TouchList): number {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    onTouchStart(e: TouchEvent) {
        if (e.touches.length === 2) {
            e.preventDefault(); // prevent native pinch-zoom on the page
            this.pinch.active = true;
            this.pinch.startDistance = this.getTouchDistance(e.touches);
            this.pinch.lastDistance = this.pinch.startDistance;
        }
    }

    onTouchMove(e: TouchEvent) {
        if (!this.pinch.active || e.touches.length < 2) return;
        e.preventDefault();

        const currentDistance = this.getTouchDistance(e.touches);
        const delta = currentDistance - this.pinch.lastDistance;
        this.pinch.lastDistance = currentDistance;

        // Map pinch delta to scrollY (same axis as scroll wheel)
        // Negative delta = pinch in = zoom out, Positive = pinch out = zoom in
        const zoomSensitivity = 0.02;
        const scrollDelta = -delta * zoomSensitivity * this.sizes.height;

        this.scrollY.target += scrollDelta;
        if (this.material) {
            this.material.uniforms.uSpeedY.value += scrollDelta;
        }
    }

    onTouchEnd() {
        this.pinch.active = false;
    }

    onResize() {
        const { clientWidth, clientHeight } = this.container;
        this.dimensions = {
            width: clientWidth,
            height: clientHeight,
            pixelRatio: Math.min(2, window.devicePixelRatio),
        };

        this.camera.aspect = clientWidth / clientHeight;
        this.camera.updateProjectionMatrix();
        this.setSizes();

        this.renderer.setPixelRatio(this.dimensions.pixelRatio);
        this.renderer.setSize(this.dimensions.width, this.dimensions.height);
    }

    onWheel(event: WheelEvent) {
        const normalizedWheel = normalizeWheel(event);

        // We let normal scroll pass through (passive: true), 
        // but we pick up the delta to move the Z-axis in the WebGL scene.
        // We scale it down slightly so the gallery moves nicely alongside page scroll.
        const scrollY = (normalizedWheel.pixelY * this.sizes.height) / window.innerHeight;

        this.scrollY.target += scrollY;
        if (this.material) {
            this.material.uniforms.uSpeedY.value += scrollY;
        }
    }

    renderLoop = () => {
        if (!this.isInView) return;

        const now = this.clock.getElapsedTime();
        const delta = now - this.time;
        this.time = now;

        if (this.material) {
            const normalizedDelta = delta / (1 / 60) || 1;
            this.material.uniforms.uTime.value += normalizedDelta * 0.015;

            this.drag.xCurrent += (this.drag.xTarget - this.drag.xCurrent) * this.dragDamping;
            this.drag.yCurrent += (this.drag.yTarget - this.drag.yCurrent) * this.dragDamping;
            this.material.uniforms.uDrag.value.set(this.drag.xCurrent, this.drag.yCurrent);

            const interpolate = (current: number, target: number, ease: number) => current + (target - current) * ease;
            this.scrollY.current = interpolate(this.scrollY.current, this.scrollY.target, 0.12);

            this.material.uniforms.uScrollY.value = this.scrollY.current;
            this.material.uniforms.uSpeedY.value *= 0.835;
        }

        this.renderer.render(this.scene, this.camera);
        this.animationFrameId = requestAnimationFrame(this.renderLoop);
    }

    destroy() {
        if (this.observer) this.observer.disconnect();
        cancelAnimationFrame(this.animationFrameId);
        window.removeEventListener("resize", this.boundOnResize);
        window.removeEventListener("wheel", this.boundOnWheel);
        window.removeEventListener("pointermove", this.boundOnPointerMove);
        window.removeEventListener("pointerup", this.boundOnPointerUp);

        // Cleanup touch listeners
        this.canvas.removeEventListener("touchstart", this.boundOnTouchStart);
        this.canvas.removeEventListener("touchmove", this.boundOnTouchMove);
        this.canvas.removeEventListener("touchend", this.boundOnTouchEnd);

        if (this.geometry) this.geometry.dispose();
        if (this.material) this.material.dispose();
        if (this.atlasTexture) this.atlasTexture.dispose();
        if (this.blurryAtlasTexture) this.blurryAtlasTexture.dispose();
        this.renderer.dispose();
    }
}
