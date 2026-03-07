import * as THREE from 'three';

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

export class GalleryAtlas {
    atlasTexture: THREE.Texture | null = null;
    blurryAtlasTexture: THREE.Texture | null = null;
    imageInfos: ImageInfo[] = [];

    async loadTextureAtlas(urls: string[]) {
        const imagePromises = urls.map(async (path) => {
            return await new Promise<CanvasImageSource>((resolve) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => resolve(img);
                img.onerror = () => {
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
        
        return { texture: this.atlasTexture, infos: this.imageInfos };
    }

    createBlurryAtlas(sourceTexture: THREE.Texture) {
        const blurryCanvas = document.createElement("canvas");
        blurryCanvas.width = (sourceTexture.image as HTMLCanvasElement).width / 4; // Downscale for perf
        blurryCanvas.height = (sourceTexture.image as HTMLCanvasElement).height / 4;
        const ctx = blurryCanvas.getContext("2d")!;
        ctx.filter = "blur(20px)"; // Smaller blur radius on smaller canvas
        ctx.drawImage(sourceTexture.image as CanvasImageSource, 0, 0, blurryCanvas.width, blurryCanvas.height);

        this.blurryAtlasTexture = new THREE.Texture(blurryCanvas);
        this.blurryAtlasTexture.wrapS = THREE.ClampToEdgeWrapping;
        this.blurryAtlasTexture.wrapT = THREE.ClampToEdgeWrapping;
        this.blurryAtlasTexture.minFilter = THREE.LinearFilter;
        this.blurryAtlasTexture.magFilter = THREE.LinearFilter;
        this.blurryAtlasTexture.needsUpdate = true;
        
        return this.blurryAtlasTexture;
    }

    dispose() {
        if (this.atlasTexture) this.atlasTexture.dispose();
        if (this.blurryAtlasTexture) this.blurryAtlasTexture.dispose();
    }
}
