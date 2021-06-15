export default class PenOptions{
    constructor(canvas,brush){
        this.canvas = canvas;
        this.brush = this.canvas.freeDrawingBrush;
        this.colorElement = this.initColorElement();
        this.widthElement = this.initWidthElement();
        this.widthDisplayElement = this.initWidthDisplayElement();
        this.color = this.colorElement.value;
        this.width = parseInt(this.widthElement.value);
        this.isDrawingMode = false;
    }


    //initializers
    initColorElement(){
        return document.getElementById("drawing-color")
    }
    initWidthElement(){
        return document.getElementById("drawing-line-width")
    }
    initWidthDisplayElement(){
        return document.querySelector("#toolbar .draw-list .draw-width-info");
    }

    init(){
        this.brush.color = this.color;
        this.brush.width = this.width;
    }
    changeHandler(){
        this.colorElement.addEventListener('change',(e)=>{
            this.color = e.target.value; 
            this.brush.color = this.color;          
        })

        // this.widthElement.addEventListener('change',(e)=>{
        //     this.width = parseInt(e.target.value);
        //     this.widthDisplayElement.innerText = this.width;
        //     this.brush.width = this.width;
        // })
        this.widthElement.addEventListener('input',(e)=>{
            this.width = parseInt(e.target.value);
            this.widthDisplayElement.innerText = this.width;
            this.brush.width = this.width;
        })
    }

}