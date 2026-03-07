<<<<<<< HEAD
import WebGLGallery from './WebGL/WebGLGallery';
export default WebGLGallery;
=======
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './glsl';
import { logger } from './logger';
import { TextureManager } from './TextureManager';
import { InteractionHandler } from './InteractionHandler';

interface Size {
    width: number;
    height: number;
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

    textureManager: TextureManager;
    interaction: InteractionHandler;

    isInView: boolean = true;
    observer!: IntersectionObserver;
    animationFrameId: number = 0;

    constructor(container: HTMLElement, canvas: HTMLCanvasElement) {
        this.container = container;
        this.canvas = canvas;
        this.clock = new THREE.Clock();
        this.meshCount = window.innerWidth < 768 ? 80 : 200;

        this.textureManager = new TextureManager();
        this.interaction = new InteractionHandler(this.canvas, () => {});

        this.init();
    }

    async init() {
        try {
            this.createScene();
            this.createCamera();
            this.createRenderer();
            this.setSizes();

            this.createGeometry();
            this.createMaterial();
            this.createInstancedMesh();

            this.setupObserver();

            const urls: string[] = new Array(17).fill(0).map((_, i) => `/covers/image_${i}.webp`);
            await this.textureManager.loadTextureAtlas(urls);
            this.textureManager.createBlurryAtlas();
            this.fillMeshData();

            this.material.uniforms.uAtlas.value = this.textureManager.atlasTexture;

            if (this.isInView) this.renderLoop();
            logger.info('WebGLGallery initialized');
        } catch (error) {
            logger.error('Failed to initialize WebGLGallery', {}, error as Error);
        }
    }

    private setupObserver() {
        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (!this.isInView) {
                    this.isInView = true;
                    this.time = this.clock.getElapsedTime();
                    this.renderLoop();
                }
            } else {
                this.isInView = false;
                cancelAnimationFrame(this.animationFrameId);
            }
        }, { rootMargin: '200px' });
        this.observer.observe(this.container);
    }

    createScene() {
        this.scene = new THREE.Scene();
    }

    createCamera() {
        const { clientWidth, clientHeight } = this.container;
        this.camera = new THREE.PerspectiveCamera(75, clientWidth / clientHeight, 0.1, 100);
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
            powerPreference: 'high-performance'
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
                uMaxXdisplacement: { value: new THREE.Vector2(this.sizes.width * 2.5, this.sizes.height * 2.5) },
                uWrapperTexture: {
                    value: new THREE.TextureLoader().load("/photo_frame.webp", (tex) => {
                        tex.minFilter = THREE.NearestFilter;
                        tex.magFilter = THREE.NearestFilter;
                        tex.generateMipmaps = false;
                        tex.needsUpdate = true;
                    }),
                },
                uAtlas: { value: null },
                uScrollY: { value: 0 },
                uDrag: { value: new THREE.Vector2(0, 0) },
            },
        });
    }

    createInstancedMesh() {
        this.mesh = new THREE.InstancedMesh(this.geometry, this.material, this.meshCount);
        this.scene.add(this.mesh);
    }

    fillMeshData() {
        const count = this.meshCount;
        const initialPosition = new Float32Array(count * 3);
        const meshSpeed = new Float32Array(count);
        const aTextureCoords = new Float32Array(count * 4);
        const aImageAspect = new Float32Array(count);

        const imageInfos = this.textureManager.imageInfos;
        const maxX = this.sizes.width * 2.5;
        const maxY = this.sizes.height * 2.5;

        for (let i = 0; i < count; i++) {
            initialPosition[i * 3 + 0] = (Math.random() - 0.5) * maxX * 2;
            initialPosition[i * 3 + 1] = (Math.random() - 0.5) * maxY * 2;
            initialPosition[i * 3 + 2] = Math.random() * (7 - -30) - 30;

            meshSpeed[i] = Math.random() * 0.5 + 0.5;

            const info = imageInfos[i % imageInfos.length];
            aTextureCoords[i * 4 + 0] = info.uvs.xStart;
            aTextureCoords[i * 4 + 1] = info.uvs.xEnd;
            aTextureCoords[i * 4 + 2] = info.uvs.yStart;
            aTextureCoords[i * 4 + 3] = info.uvs.yEnd;
            aImageAspect[i] = info.aspectRatio;
        }

        this.geometry.setAttribute("aInitialPosition", new THREE.InstancedBufferAttribute(initialPosition, 3));
        this.geometry.setAttribute("aMeshSpeed", new THREE.InstancedBufferAttribute(meshSpeed, 1));
        this.mesh.geometry.setAttribute("aTextureCoords", new THREE.InstancedBufferAttribute(aTextureCoords, 4));
        this.mesh.geometry.setAttribute("aImageAspect", new THREE.InstancedBufferAttribute(aImageAspect, 1));
    }

    renderLoop = () => {
        if (!this.isInView) return;

        const delta = this.clock.getDelta();
        const timeScale = delta / (1 / 60) || 1;

        if (this.material) {
            this.material.uniforms.uTime.value += timeScale * 0.015;

            // Interpolate interactions
            const damping = 0.1;
            const worldScaleX = (this.sizes.width / window.innerWidth) * 1.5;
            const worldScaleY = (this.sizes.height / window.innerHeight) * 1.5;

            this.interaction.drag.xCurrent += (this.interaction.drag.xTarget * worldScaleX - this.interaction.drag.xCurrent) * damping;
            this.interaction.drag.yCurrent += (this.interaction.drag.yTarget * worldScaleY - this.interaction.drag.yCurrent) * damping;
            
            this.material.uniforms.uDrag.value.set(this.interaction.drag.xCurrent, this.interaction.drag.yCurrent);

            this.interaction.scrollY.current += (this.interaction.scrollY.target * worldScaleY - this.interaction.scrollY.current) * 0.12;
            this.material.uniforms.uScrollY.value = this.interaction.scrollY.current;
        }

        this.renderer.render(this.scene, this.camera);
        this.animationFrameId = requestAnimationFrame(this.renderLoop);
    }

    destroy() {
        logger.info('Destroying WebGLGallery');
        if (this.observer) this.observer.disconnect();
        cancelAnimationFrame(this.animationFrameId);
        
        this.interaction.dispose();
        this.textureManager.dispose();

        if (this.geometry) this.geometry.dispose();
        if (this.material) {
            if (this.material.uniforms.uWrapperTexture.value) this.material.uniforms.uWrapperTexture.value.dispose();
            this.material.dispose();
        }
        if (this.renderer) this.renderer.dispose();
    }
}
>>>>>>> parent of c3e9708 (revert everything)
