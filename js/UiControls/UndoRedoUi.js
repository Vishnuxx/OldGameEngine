import {UIButton , UIPanel} from "../../lib/ui.js"

function UndoRedoUI(editor , container){
    let div = new UIPanel(); //create("div" , "");

    let undo = new UIButton("Undo") //create("button" , "undo");
    //undo.innerText = "Undo";
    undo.onClick(()=>{      //scale
        editor.undo();
        console.log(editor.history)
      });
  
    let redo = new UIButton("Redo"); //create("button" , "redo");
    //redo.innerText = "Redo";
    redo.onClick(()=>{      //scale
        editor.redo();
        console.log(editor.history)
    });
  
  
    div.add(undo);
    div.add(redo);
    container.add(div);
  }
  
  function create(elem , id ){
     let ele =  document.createElement(elem);
     ele.id = id;
     ele.className = "option";
     return ele;
  }
  
  export default UndoRedoUI;