import { fabric } from 'fabric';
export default class ShapeOptions {
    constructor(canvas, mode) {
        this.canvasMain = canvas;
        this.mode = mode;
        this.recObj = [];
        this.circObj = [];
        this.initX = 0;
        this.initY = 0;
        this.mouse_down = false;
    }
    initShape() {

        this.canvasMain.canvas.on("mouse:down", () => {
            this.mouse_down = true;
            let pointer = this.canvasMain.canvas.getPointer()
            this.initX = pointer.x;
            this.initY = pointer.y;
            if (this.mode.curr === this.canvasMain.modes.shape.rect) {
                let rect = new fabric.Rect({
                    left: this.initX,
                    top: this.initY,
                    width: 0,
                    height: 0,
                    fill: "transparent",
                    stroke: "red",
                    strokeWidth: 8
                });
                this.recObj.push(rect);
                this.canvasMain.addToCanvas(this.recObj[this.recObj.length - 1]);
            }
            if (this.mode.curr === this.canvasMain.modes.shape.circ) {
                let circ = new fabric.Ellipse({
                    left: this.initX,
                    top: this.initY,
                    rx: 0,
                    ry: 0,
                    originX: 'left',
                    originY: 'top',
                    stroke: "red",
                    strokeWidth: 8
                })
                this.circObj.push(circ);
                this.canvasMain.addToCanvas(this.circObj[this.circObj.length - 1]);
            }

        });

        this.canvasMain.canvas.on("mouse:move", () => {
            if (!this.mouse_down) return;
            let pointer = this.canvasMain.canvas.getPointer()
            if (this.mode.curr === this.canvasMain.modes.shape.rect) {
                let currRect = this.recObj[this.recObj.length - 1];
                currRect.set({
                    width: Math.abs(this.initX - pointer.x),
                    height: Math.abs(this.initY - pointer.y)
                });
                currRect.set({ left: Math.min(pointer.x, this.initX) });
                currRect.set({ top: Math.min(pointer.y, this.initY) });
                currRect.setCoords();
            }
            if (this.mode.curr === this.canvasMain.modes.shape.circ) {
                let currCirc = this.circObj[this.circObj.length - 1];
                currCirc.set({
                    rx: Math.abs((this.initX - pointer.x) / 2),
                    ry: Math.abs((this.initY - pointer.y) / 2)
                })
                currCirc.set({ left: Math.min(pointer.x, this.initX) });
                currCirc.set({ top: Math.min(pointer.y, this.initY) });
                currCirc.setCoords();
            }

            this.canvasMain.renderCanvas();
        })

        this.canvasMain.canvas.on("mouse:up", () => {

            this.mouse_down = false;
        })


    }

    destroyAllObj() {
        this.recObj = [];
        this.circObj = [];
    }


}