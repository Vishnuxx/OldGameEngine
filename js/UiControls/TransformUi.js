import {UIPanel , UIButton} from "../../lib/ui.js";

function TransformControlUI(editor , container){
  let panel = new UIPanel();
  panel.setClass("toolbar");

  let translate =  new UIButton("translate"); //create("button" , "translate");

  translate.onClick(()=>{  //translate
    editor.events.transformModeChanged.dispatch("translate")
  });

  let scale = new UIButton("scale"); 

  scale.onClick(() => {
    //scale
    editor.events.transformModeChanged.dispatch("scale");
  });

  let rotate = new UIButton("rotate");
  rotate.onClick(() => {
    //rotate
    editor.events.transformModeChanged.dispatch("rotate");
  });


  panel.add(translate);
  panel.add(scale);
  panel.add(rotate);

  document.body.appendChild(panel.dom);
}

function create(elem , id ){
   let ele =  document.createElement(elem);
   ele.id = id;
   ele.className = "option";
   return ele;
}

export default TransformControlUI;