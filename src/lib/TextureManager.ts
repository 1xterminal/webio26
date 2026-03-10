import * as THREE from 'three';
import { logger } from './logger';

export interface ImageInfo {
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

export class TextureManager {
    private loader: THREE.TextureLoader;
    public atlasTexture: THREE.Texture | null = null;
    public blurryAtlasTexture: THREE.Texture | null = null;
    public imageInfos: ImageInfo[] = [];

    constructor() {
        this.loader = new THREE.TextureLoader();
    }

    async loadTextureAtlas(urls: string[]): Promise<void> {
        try {
            const imagePromises = urls.map(async (path) => {
                return await new Promise<CanvasImageSource>((resolve) => {
                    const img = typeof window !== 'undefined' ? new window.Image() : {} as any;
                    if (typeof window === 'undefined') {
                        resolve({} as CanvasImageSource);
                        return;
                    }
                    img.crossOrigin = "anonymous";
                    img.onload = () => resolve(img);
                    img.onerror = () => {
                        logger.warn(`Failed to load image: ${path}, using fallback`);
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
            const atlasWidth = Math.max(...images.map((img) => (img as HTMLImageElement | HTMLCanvasElement).width));
            let totalHeight = 0;
            images.forEach((img) => { 
                totalHeight += (img as HTMLImageElement | HTMLCanvasElement).height; 
            });

            const canvas = document.createElement("canvas");
            canvas.width = atlasWidth;
            canvas.height = totalHeight;
            const ctx = canvas.getContext("2d")!;

            let currentY = 0;
            this.imageInfos = images.map((img) => {
                const el = img as HTMLImageElement | HTMLCanvasElement;
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
            
            logger.info('Texture atlas loaded successfully', { count: urls.length });
        } catch (error) {
            logger.error('Error loading texture atlas', { error: (error as Error).message });
            throw error;
        }
    }

    createBlurryAtlas() {
        if (!this.atlasTexture) return;
        const blurryCanvas = document.createElement("canvas");
        const sourceImage = this.atlasTexture.image as HTMLCanvasElement;
        
        // Downscale for better blur performance
        blurryCanvas.width = sourceImage.width / 4;
        blurryCanvas.height = sourceImage.height / 4;
        
        const ctx = blurryCanvas.getContext("2d")!;
        ctx.filter = "blur(20px)"; // Smaller blur on smaller canvas
        ctx.drawImage(sourceImage, 0, 0, blurryCanvas.width, blurryCanvas.height);

        this.blurryAtlasTexture = new THREE.Texture(blurryCanvas);
        this.blurryAtlasTexture.wrapS = THREE.ClampToEdgeWrapping;
        this.blurryAtlasTexture.wrapT = THREE.ClampToEdgeWrapping;
        this.blurryAtlasTexture.minFilter = THREE.LinearFilter;
        this.blurryAtlasTexture.magFilter = THREE.LinearFilter;
        this.blurryAtlasTexture.needsUpdate = true;
    }

    dispose() {
        if (this.atlasTexture) this.atlasTexture.dispose();
        if (this.blurryAtlasTexture) this.blurryAtlasTexture.dispose();
        this.atlasTexture = null;
        this.blurryAtlasTexture = null;
    }
}
