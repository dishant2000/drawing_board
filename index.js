jscolor.presets.default = {
    palette: [
        '#000000', '#7d7d7d', '#870014', '#ec1c23', '#ff7e26', '#fef100', '#22b14b', '#00a1e7', '#3f47cc', '#a349a4',
        '#ffffff', '#c3c3c3', '#b87957', '#feaec9', '#ffc80d', '#eee3af', '#b5e61d', '#99d9ea', '#7092be', '#c8bfe7',
    ],
}

const dropBtn = document.querySelector("#toolbar .draw-dropdown .draw-drop-btn");
const dropList = document.querySelector("#toolbar .draw-dropdown .draw-list");
const shapeBtn = document.querySelector(".shape-wrapper .shape-drop-btn");
const shapeList = document.querySelector(".shape-wrapper .shape-list");
const shapeListItems = document.querySelectorAll(".shape-wrapper .shape-list li");
const shapeActiveBtn = document.querySelector(".shape-wrapper .active-draw-btn");
const shapeClrBtn = document.querySelector(".shape-option-list .shape-clr-btn");
const selectBtn = document.querySelector("#toolbar .select-btn");
dropBtn.addEventListener('click',(e)=>{
    dropList.classList.toggle("active");
})

shapeBtn.addEventListener('click',(e)=>{
    if(shapeActiveBtn.classList.contains('active')){
        return;
    }
    shapeList.classList.toggle("active");
});

Array.from(shapeListItems).forEach((listItem)=>{
    listItem.addEventListener('click',(e)=>{
        let activeHtml = e.target.innerHTML;
        shapeActiveBtn.innerHTML = activeHtml;
        shapeActiveBtn.value = e.target.innerText.toLowerCase();
        shapeList.classList.toggle("active");
    })
})
