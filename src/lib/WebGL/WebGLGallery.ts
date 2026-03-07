import * as THREE from 'three';
import { vertexShader, fragmentShader } from '@/lib/glsl';
import { GalleryAtlas } from './GalleryAtlas';
import { GalleryInteraction } from './GalleryInteraction';
import { GALLERY_CONFIG } from '@/lib/constants';

export default class WebGLGallery {
    private container: HTMLElement;
    private canvas: HTMLCanvasElement;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private sizes = { width: 0, height: 0 };
    private clock: THREE.Clock;

    private geometry!: THREE.PlaneGeometry;
    private material!: THREE.ShaderMaterial;
    private mesh!: THREE.InstancedMesh;
    private meshCount: number;

    private atlas: GalleryAtlas;
    private interaction: GalleryInteraction;
    private isInView: boolean = true;
    private observer!: IntersectionObserver;
    private animationFrameId: number = 0;
    private time: number = 0;

    constructor(container: HTMLElement, canvas: HTMLCanvasElement) {
        this.container = container;
        this.canvas = canvas;
        this.clock = new THREE.Clock();
        this.meshCount = window.innerWidth < 768 ? GALLERY_CONFIG.MESH_COUNT_MOBILE : GALLERY_CONFIG.MESH_COUNT_DESKTOP;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 100);
        this.camera.position.z = GALLERY_CONFIG.CAMERA_Z;

        this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

        this.setSizes();

        this.atlas = new GalleryAtlas();
        this.interaction = new GalleryInteraction({
            sensitivity: GALLERY_CONFIG.DRAG_SENSITIVITY,
            damping: GALLERY_CONFIG.DRAG_DAMPING,
            sizes: this.sizes
        });

        this.init();
    }

    private setSizes() {
        const fov = this.camera.fov * (Math.PI / 180);
        const height = this.camera.position.z * Math.tan(fov / 2) * 2;
        const width = height * this.camera.aspect;
        this.sizes = { width, height };
        if (this.interaction) this.interaction.updateSizes(this.sizes);
    }

    private async init() {
        this.createObjects();
        this.interaction.addEventListeners(this.container, this.canvas);
        this.interaction.onWheelCallback = (delta) => {
            if (this.material) this.material.uniforms.uSpeedY.value += delta;
        };

        const urls = new Array(17).fill(0).map((_, i) => `/covers/image_${i}.webp`);
        const { texture } = await this.atlas.loadTextureAtlas(urls);
        const blurry = this.atlas.createBlurryAtlas(texture);
        
        this.material.uniforms.uAtlas.value = texture;
        this.material.uniforms.uBlurryAtlas.value = blurry;
        this.fillMeshData();

        this.setupObserver();
        if (this.isInView) this.renderLoop();
    }

    private createObjects() {
        this.geometry = new THREE.PlaneGeometry(1.295, 1, 1, 1);
        this.geometry.scale(1.8, 1.8, 1.8);

        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            transparent: true,
            uniforms: {
                uTime: { value: 0 },
                uMaxXdisplacement: { value: new THREE.Vector2(this.sizes.width * 2, this.sizes.height * 2) },
                uWrapperTexture: {
                    value: new THREE.TextureLoader().load("/photo_frame.webp", (tex) => {
                        tex.minFilter = THREE.NearestFilter;
                        tex.magFilter = THREE.NearestFilter;
                        tex.generateMipmaps = false;
                    }),
                },
                uAtlas: new THREE.Uniform(null),
                uBlurryAtlas: new THREE.Uniform(null),
                uScrollY: { value: 0 },
                uSpeedY: { value: 0 },
                uDrag: { value: new THREE.Vector2(0, 0) },
            },
        });

        this.mesh = new THREE.InstancedMesh(this.geometry, this.material, this.meshCount);
        this.scene.add(this.mesh);
    }

    private fillMeshData() {
        const initialPosition = new Float32Array(this.meshCount * 3);
        const meshSpeed = new Float32Array(this.meshCount);
        const aTextureCoords = new Float32Array(this.meshCount * 4);
        const aImageAspect = new Float32Array(this.meshCount);

        for (let i = 0; i < this.meshCount; i++) {
            initialPosition[i * 3 + 0] = (Math.random() - 0.5) * this.sizes.width * 4;
            initialPosition[i * 3 + 1] = (Math.random() - 0.5) * this.sizes.height * 4;
            initialPosition[i * 3 + 2] = Math.random() * (GALLERY_CONFIG.MAX_Z - GALLERY_CONFIG.MIN_Z) + GALLERY_CONFIG.MIN_Z;

            meshSpeed[i] = Math.random() * 0.5 + 0.5;

            const imageIndex = i % this.atlas.imageInfos.length;
            const info = this.atlas.imageInfos[imageIndex];
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

    private renderLoop = () => {
        if (!this.isInView) return;

        const now = this.clock.getElapsedTime();
        const delta = now - this.time;
        this.time = now;

        if (this.material) {
            const normalizedDelta = delta / (1 / 60) || 1;
            this.material.uniforms.uTime.value += normalizedDelta * 0.015;

            this.interaction.updateInterpolation();
            this.material.uniforms.uDrag.value.set(this.interaction.drag.xCurrent, this.interaction.drag.yCurrent);
            this.material.uniforms.uScrollY.value = this.interaction.scrollY.current;
            this.material.uniforms.uSpeedY.value *= 0.835;
        }

        this.renderer.render(this.scene, this.camera);
        this.animationFrameId = requestAnimationFrame(this.renderLoop);
    }

    public destroy() {
        if (this.observer) this.observer.disconnect();
        cancelAnimationFrame(this.animationFrameId);
        this.interaction.removeEventListeners();
        
        if (this.geometry) this.geometry.dispose();
        if (this.material) this.material.dispose();
        this.atlas.dispose();
        this.renderer.dispose();
    }
}
