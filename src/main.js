import {fabric} from 'fabric';
import PenOptions from './components/penOptions';
import ShapeOptions from './components/shapeOptions';
export default class Main{
    constructor(id, width , height){
        this.id = id;
        this.height = height;
        this.width = width;
        this.canvas = this.initCanvas();
        this.selection = false;
        this.modes = {
            pan : 'pan',
            draw : 'draw',
            clear : 'clear',
            shape : {
                default : "shape",
                rect : "rect",
                circ : "circ",
                curr : 'shape'
            },
            select : "select"
        }
        this.currMode = false;
        this.mouseDown = false;
        this.isDrawingMode = false;
        this.freeDrawingBrush = false;
        this.shapeOptions = new ShapeOptions(this,this.modes.shape);
    }
    //getters and setters
    setCurrMode(mode){
        // console.log(this);
        this.currMode = mode;
    }
    setCursor(cursorType){
        this.canvas.defaultCursor = cursorType;
    }
    //canvas setters and getters

    getZoom(){
        return this.canvas.getZoom();
    }
    getCenter(){
        return this.canvas.getCenter();
    }
    zoomToPoint(point,zoom){
        this.canvas.zoomToPoint(point,zoom);
    }
    enableSelection(){
        this.selection = true;
        this.canvas.selection = true;
        this.renderCanvas();
    }
    disableSelection(){
        this.selection = false;
        this.canvas.selection = false;
        this.renderCanvas();
    }
    getSelectionElement(){
        return this.canvas.getSelectionElement();
    }
    getActiveObjects(){
        return this.canvas.getActiveObjects();
    }
    discardActiveObjects(){
        this.canvas.discardActiveObject()
    }
    remove(obj){
        this.canvas.remove(obj);
    }
    // other helper functions
    addToCanvas(obj){
        this.canvas.add(obj);
    }
    renderCanvas(){
        this.canvas.requestRenderAll();
    }
    //initializers
    initCanvas(){
        return new fabric.Canvas(this.id,{
            width : this.width,
            height : this.height,
            selection : this.selection,
        })
    }
    placeBkgImg(img){
        fabric.Image.fromURL(img,(img)=>{
            this.canvas.backgroundImage = img;
            this.renderCanvas();
        },{
            scaleX : 0.3,
            scaleY : 0.3
        })
    }

    initPanning(){
        if(this.currMode !== this.modes.pan) return;
        this.canvas.on('mouse:down',()=>{
            if(this.currMode !== this.modes.pan) return;
            this.mouseDown = true;
            this.canvas.defaultCursor = 'grab';
            this.renderCanvas();
        })

        this.canvas.on('mouse:move',(event)=>{
            if(this.currMode !== this.modes.pan) return;
            if(!this.mouseDown) return;
            this.setCursor('grab');
            const me = event.e;
            let point = new fabric.Point(me.movementX,me.movementY);
            this.canvas.relativePan(point);
            this.renderCanvas();
        })
        this.canvas.on('mouse:up',()=>{
            if(this.currMode !== this.modes.pan) return;
            this.mouseDown = false;
            this.setCursor('default');
            this.renderCanvas();
        })
    }
    initDrawing(){
        this.canvas.isDrawingMode = true;
        this.isDrawingMode = true;
        this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas)
        this.freeDrawingBrush = this.canvas.freeDrawingBrush;
        const penoptions = new PenOptions(this,this.freeDrawingBrush);
        penoptions.init();
        penoptions.changeHandler();
    }
    clearDrawing(){
        this.canvas.isDrawingMode = false;
        this.isDrawingMode = false;
        this.freeDrawingBrush = false;
        this.renderCanvas();
    }
    initClear(){
        this.canvas.getObjects().forEach((obj)=>{
            if(obj !== this.canvas.backgroundImage){
                this.canvas.remove(obj);
            }
        })
       
    }
    handleShapeDrawing(currShape){
        this.setCurrMode(this.modes.shape[currShape]);
        this.modes.shape.curr = this.currMode;
        this.shapeOptions.initShape();
    }
    stopShapeDrawing(){
        this.setCurrMode(false);
        this.clearEvents();
    }

    initZooming(){
        this.canvas.on('mouse:wheel', (opt)=>{
            var delta = opt.e.deltaY;
            var zoom = this.canvas.getZoom();
            zoom *= 0.999 ** delta;
            if (zoom > 20) zoom = 20;
            if (zoom < 0.01) zoom = 0.01;
            this.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
            opt.e.preventDefault();
            opt.e.stopPropagation();
          });
    }
    clearEvents(){
        this.canvas.off('mouse:down');
        this.canvas.off('mouse:move');
        this.canvas.off('mouse:up');
    }
}