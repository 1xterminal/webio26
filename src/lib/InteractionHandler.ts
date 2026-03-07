import normalizeWheel from 'normalize-wheel';

export interface DragState {
    xCurrent: number;
    xTarget: number;
    yCurrent: number;
    yTarget: number;
    isDown: boolean;
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
}

export interface PinchState {
    active: boolean;
    startDistance: number;
}

export class InteractionHandler {
    public drag: DragState = {
        xCurrent: 0, xTarget: 0,
        yCurrent: 0, yTarget: 0,
        isDown: false,
        startX: 0, startY: 0,
        lastX: 0, lastY: 0,
    };

    public pinch: PinchState = { active: false, startDistance: 0 };
    public scrollY = { target: 0, current: 0 };
    public direction: 'undecided' | 'horizontal' | 'vertical' = 'undecided';

    private element: HTMLElement;
    private onUpdate: (delta: { zoom: number, speed: number }) => void;

    constructor(element: HTMLElement, onUpdate: (delta: { zoom: number, speed: number }) => void) {
        this.element = element;
        this.onUpdate = onUpdate;
        this.bindEvents();
    }

    private bindEvents() {
        this.element.addEventListener('pointerdown', this.onPointerDown);
        window.addEventListener('pointermove', this.onPointerMove);
        window.addEventListener('pointerup', this.onPointerUp);
        
        this.element.addEventListener('touchstart', this.onTouchStart, { passive: true });
        this.element.addEventListener('touchmove', this.onTouchMove, { passive: false });
        this.element.addEventListener('touchend', this.onTouchEnd, { passive: true });
        
        window.addEventListener('wheel', this.onWheel, { passive: true });
    }

    private onPointerDown = (e: PointerEvent) => {
        this.drag.isDown = true;
        this.drag.startX = e.clientX;
        this.drag.startY = e.clientY;
        this.drag.lastX = e.clientX;
        this.drag.lastY = e.clientY;
        this.direction = 'undecided';

        if (e.pointerType !== 'touch') {
            this.element.setPointerCapture(e.pointerId);
        }
    };

    private onPointerMove = (e: PointerEvent) => {
        if (!this.drag.isDown) return;
        
        const dx = e.clientX - this.drag.lastX;
        const dy = e.clientY - this.drag.lastY;
        this.drag.lastX = e.clientX;
        this.drag.lastY = e.clientY;

        if (e.pointerType === 'touch' && this.direction === 'undecided') {
            const totalDx = Math.abs(e.clientX - this.drag.startX);
            const totalDy = Math.abs(e.clientY - this.drag.startY);
            const threshold = 8;

            if (totalDx < threshold && totalDy < threshold) return;

            if (totalDy > totalDx) {
                this.direction = 'vertical';
                this.drag.isDown = false;
                return;
            } else {
                this.direction = 'horizontal';
            }
        }

        if (e.pointerType === 'touch' && this.direction === 'vertical') return;

        if (e.pointerType === 'touch' && this.direction === 'horizontal') {
            // Check if we can prevent default safely
            // e.preventDefault(); 
        }

        // Flip deltas to match natural expectation (pull to scroll)
        this.drag.xTarget += dx; 
        if (e.pointerType !== 'touch') {
            this.drag.yTarget -= dy;
        }
    };

    private onPointerUp = () => {
        this.drag.isDown = false;
        this.direction = 'undecided';
    };

    private onWheel = (e: WheelEvent) => {
        const normalized = normalizeWheel(e);
        // Scroll down = move items away (zoom out)
        this.scrollY.target -= normalized.pixelY;
        this.onUpdate({ zoom: -normalized.pixelY, speed: -normalized.pixelY });
    };

    private onTouchStart = (e: TouchEvent) => {
        if (e.touches.length >= 2) {
            this.pinch.active = true;
            this.pinch.startDistance = this.getTouchDistance(e.touches[0], e.touches[1]);
            this.drag.isDown = false;
        }
    };

    private onTouchMove = (e: TouchEvent) => {
        if (!this.pinch.active || e.touches.length < 2) return;
        e.preventDefault();

        const currentDistance = this.getTouchDistance(e.touches[0], e.touches[1]);
        const delta = currentDistance - this.pinch.startDistance;
        
        const zoomDelta = delta * 2.0; // Inverted pinch delta
        this.scrollY.target += zoomDelta;
        this.onUpdate({ zoom: zoomDelta, speed: zoomDelta });
        this.pinch.startDistance = currentDistance;
    };

    private onTouchEnd = (e: TouchEvent) => {
        if (e.touches.length < 2) this.pinch.active = false;
    };

    private getTouchDistance(t1: Touch, t2: Touch): number {
        const dx = t1.clientX - t2.clientX;
        const dy = t1.clientY - t2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    dispose() {
        this.element.removeEventListener('pointerdown', this.onPointerDown);
        window.removeEventListener('pointermove', this.onPointerMove);
        window.removeEventListener('pointerup', this.onPointerUp);
        this.element.removeEventListener('touchstart', this.onTouchStart);
        this.element.removeEventListener('touchmove', this.onTouchMove);
        this.element.removeEventListener('touchend', this.onTouchEnd);
        window.removeEventListener('wheel', this.onWheel);
    }
}
