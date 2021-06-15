import Main from './main';
import bckImg from '../assets/background.png'
import Toolbar from './components/toolbar'
//canvas things 

export const canvasMain = new Main('mcanvas',800,600);
canvasMain.renderCanvas();
// canvasMain.placeBkgImg(bckImg);
canvasMain.initZooming();

// toolbar things

export const toolbarMain = new Toolbar(canvasMain);
toolbarMain.initPanBtn();
toolbarMain.panBtnToggle();
toolbarMain.initDrawBtn();
toolbarMain.drawBtnToggle()
toolbarMain.clearBtnToggle();
toolbarMain.shapeBtnToggle();
toolbarMain.zoomBtnToggle();
toolbarMain.selectBtnToggle();
toolbarMain.deleteBtnToggle();