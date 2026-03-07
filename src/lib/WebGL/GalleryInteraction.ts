import normalizeWheel from 'normalize-wheel';

export class GalleryInteraction {
    drag = {
        xCurrent: 0, xTarget: 0,
        yCurrent: 0, yTarget: 0,
        isDown: false,
        startX: 0, startY: 0,
        lastX: 0, lastY: 0,
    };
    scrollY = { target: 0, current: 0, direction: 0 };
    isHovered: boolean = false;

    private sensitivity: number;
    private damping: number;
    private sizes: { width: number; height: number };

    // Bound methods for cleanup
    private boundOnWheel: (e: WheelEvent) => void;
    private boundOnPointerMove: (e: PointerEvent) => void;
    private boundOnPointerUp: () => void;

    onWheelCallback?: (delta: number) => void;

    constructor(options: { sensitivity: number, damping: number, sizes: { width: number, height: number } }) {
        this.sensitivity = options.sensitivity;
        this.damping = options.damping;
        this.sizes = options.sizes;

        this.boundOnWheel = this.onWheel.bind(this);
        this.boundOnPointerMove = this.onPointerMove.bind(this);
        this.boundOnPointerUp = this.onPointerUp.bind(this);
    }

    updateSizes(sizes: { width: number, height: number }) {
        this.sizes = sizes;
    }

    addEventListeners(container: HTMLElement, canvas: HTMLCanvasElement) {
        window.addEventListener("wheel", this.boundOnWheel, { passive: true });
        container.addEventListener("mouseenter", () => this.isHovered = true);
        container.addEventListener("mouseleave", () => this.isHovered = false);

        canvas.addEventListener("pointerdown", (e) => {
            this.drag.isDown = true;
            this.drag.startX = e.clientX;
            this.drag.startY = e.clientY;
            this.drag.lastX = e.clientX;
            this.drag.lastY = e.clientY;
            canvas.setPointerCapture(e.pointerId);
        });

        window.addEventListener("pointermove", this.boundOnPointerMove);
        window.addEventListener("pointerup", this.boundOnPointerUp);
    }

    removeEventListeners() {
        window.removeEventListener("wheel", this.boundOnWheel);
        window.removeEventListener("pointermove", this.boundOnPointerMove);
        window.removeEventListener("pointerup", this.boundOnPointerUp);
    }

    private onWheel(event: WheelEvent) {
        const normalized = normalizeWheel(event);
        const scrollDelta = (normalized.pixelY * this.sizes.height) / window.innerHeight;
        this.scrollY.target += scrollDelta;
        if (this.onWheelCallback) this.onWheelCallback(scrollDelta);
    }

    private onPointerMove(e: PointerEvent) {
        if (!this.drag.isDown) return;
        const dx = e.clientX - this.drag.lastX;
        const dy = e.clientY - this.drag.lastY;
        this.drag.lastX = e.clientX;
        this.drag.lastY = e.clientY;

        const worldPerPixelX = (this.sizes.width / window.innerWidth) * this.sensitivity;
        const worldPerPixelY = (this.sizes.height / window.innerHeight) * this.sensitivity;

        this.drag.xTarget += -dx * worldPerPixelX;
        this.drag.yTarget += dy * worldPerPixelY;
    }

    private onPointerUp() {
        this.drag.isDown = false;
    }

    updateInterpolation() {
        this.drag.xCurrent += (this.drag.xTarget - this.drag.xCurrent) * this.damping;
        this.drag.yCurrent += (this.drag.yTarget - this.drag.yCurrent) * this.damping;
        this.scrollY.current += (this.scrollY.target - this.scrollY.current) * this.damping;
    }
}
