import { canvasMain } from '..';

export default class Toolbar{
    constructor(canvas){
        this.canvas = canvas;
        this.panBtn = this.initPanBtn();
        this.drawBtn = this.initDrawBtn();
        this.clearBtn = this.initClearBtn();
        this.shapeBtn = this.initShapeBtn();
        this.zoomInBtn = this.initZoomInBtn();
        this.zoomOutBtn = this.initZoomOutBtn();
        this.selectBtn = this.initSelectBtn();
        this.deleteBtn = this.initDeleteBtn();
    }
    //all initializers
    initPanBtn(){
        return document.querySelector("#toolbar .btn-pan");
    }
    initDrawBtn(){
        return document.querySelector("#toolbar .btn-draw");
    }
    initClearBtn(){
        return document.querySelector("#toolbar .btn-clear");
    }
    initShapeBtn(){
        return document.querySelector(".shape-wrapper .active-draw-btn");
    }
    initZoomInBtn(){
        return document.querySelector(".zoom-wrapper .zoom-in");
    }
    initZoomOutBtn(){
        return document.querySelector(".zoom-wrapper .zoom-out");
    }
    initSelectBtn(){
        return document.querySelector("#toolbar .select-btn");
    }
    initDeleteBtn(){
        return document.querySelector("#toolbar .delete-btn");
    }
    //all helper functions
    panBtnToggle(){
       
        this.panBtn.addEventListener('click',()=>{
            this.panBtn.classList.toggle('active');
            if(this.canvas.currMode !== this.canvas.modes.pan){
                this.clearOtherBtn('pan');
                this.canvas.setCurrMode(this.canvas.modes.pan);
                this.canvas.initPanning();
            }
            else{
                this.canvas.setCurrMode(false);
                this.canvas.clearEvents();
            }
        })
    }

    drawBtnToggle(){
        
        this.drawBtn.addEventListener('click',()=>{
            this.drawBtn.classList.toggle('active');
            if(this.canvas.currMode !== this.canvas.modes.draw){
                this.clearOtherBtn('draw');
                this.canvas.setCurrMode(this.canvas.modes.draw);
                this.canvas.initDrawing();

                // console.log(this.canvas.freeDrawingBrush, " ", this.canvas.freeDrawingBrush);
                
            }
            else{
                this.canvas.setCurrMode(false);
                this.canvas.clearDrawing();
            }
        })
    }

    clearBtnToggle(){
        this.clearBtn.addEventListener('click',()=>{
            this.clearBtn.classList.toggle("active");
            if(this.canvas.currMode !== this.canvas.modes.clear){
                this.clearOtherBtn('clear');
                this.canvas.setCurrMode(this.canvas.modes.clear);
                this.canvas.initClear();
                this.canvas.setCurrMode(false);
                this.clearBtn.classList.toggle("active");
            }
            else{
                this.canvas.setCurrMode(false);
            }
        })
    }


    shapeBtnToggle(){
        this.shapeBtn.addEventListener('click',(e)=>{
            // console.log("yae chala tha",e.target.value)
            if(e.target.value == 'shape') return;
            else{
                this.clearOtherBtn(e.target.value);
                if(!this.shapeBtn.classList.contains("active") && e.target.value !== undefined){
                    this.shapeBtn.classList.add('active');
                    this.canvas.handleShapeDrawing(e.target.value);
                }
                else{
                    this.shapeBtn.classList.remove('active');
                    this.canvas.stopShapeDrawing();
                }
            }
        })
    }

    zoomBtnToggle(){
        this.zoomInBtn.addEventListener('click',(e)=>{
            let cp = this.canvas.getCenter();
            let pointC = new fabric.Point(cp.left,cp.top);

            let currZoom = this.canvas.getZoom();
            currZoom += 0.2;
            if (currZoom > 20) currZoom = 20;
            if (currZoom < 0.01) currZoom = 0.01;
            this.canvas.zoomToPoint(pointC,currZoom);
        })

        this.zoomOutBtn.addEventListener('click',(e)=>{
            let cp = this.canvas.getCenter();
            let pointC = new fabric.Point(cp.left,cp.top);
            let currZoom = this.canvas.getZoom();
            currZoom -= 0.1;
            if (currZoom > 20) currZoom = 20;
            if (currZoom < 0.01) currZoom = 0.01;

            this.canvas.zoomToPoint(pointC,currZoom);
        })
    }

    selectBtnToggle(){
        this.selectBtn.addEventListener('click',(e)=>{
            if(this.canvas.currMode != this.canvas.modes.select){
                this.clearOtherBtn('select');
                this.canvas.setCurrMode(this.canvas.modes.select);
                this.selectBtn.classList.add('active');
                this.canvas.enableSelection();
            }
            else{
                this.selectBtn.classList.remove('active')
                this.canvas.disableSelection();
                this.canvas.setCurrMode(false);
            }
        })
    }
    deleteBtnToggle(){
        this.deleteBtn.addEventListener('click',(e)=>{
            let currSelected = this.canvas.getActiveObjects();
            currSelected.forEach(item => {
                this.canvas.remove(item);
            })
            this.canvas.discardActiveObjects();
            this.canvas.renderCanvas();
        })
    }
    clearOtherBtn(curr){
        if(this.canvas.currMode === false) return;
        switch(this.canvas.currMode){
            case this.canvas.modes.pan :
                if(this.canvas.currMode !== curr){
                    this.panBtn.classList.toggle('active');
                    this.canvas.setCurrMode(false);
                    this.canvas.clearEvents();
                }
                break;
            case this.canvas.modes.draw :
                if(this.canvas.currMode !== curr){
                    this.drawBtn.classList.toggle('active');
                    this.canvas.setCurrMode(false);
                    this.canvas.clearDrawing();
                }
                break;
            case this.canvas.modes.clear : 
                if(this.canvas.currMode !== curr){
                 // todo clear other events   
                }
                break;
            case this.canvas.modes.shape.curr : {
                if(this.canvas.currMode !== curr){
                    this.shapeBtn.classList.remove('active');
                    this.canvas.stopShapeDrawing();
                }
                break;
            }

            case this.canvas.modes.select : 
                if(this.canvas.currMode !== curr){
                    this.selectBtn.classList.remove('active')
                    this.canvas.disableSelection();
                    this.canvas.setCurrMode(false);
                }
            default : console.log("Something wrong mode is selected!"); 
        }
    }
}