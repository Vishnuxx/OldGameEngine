import { UIButton, UIPanel } from "../../lib/ui.js";
import { AddObjectCommand, RemoveObjectCommand } from "../Commands/Commands.js";
//import { RemoveObjectCommand } from "../Commands/RemoveObjectCommand.js";

function DeleteCloneUI(editor, container) {
  const panel = new UIPanel();
  panel.setClass("panelH");

  editor.events.objectSelected.add(function () {
    if (editor.selected !== null) {
      panel.setStyle("background", "green");
    } else {
      panel.setStyle("background", "red");
    }
  });

  let mclone = new UIButton("clone");
  mclone.onClick(() => {
    let object = editor.selected;
    object = object.clone();
    editor.execute(new AddObjectCommand(editor, object));
  });

  let deleteobject = new UIButton("remove");

  deleteobject.onClick(() => {
    if (editor.selected !== null) {
      editor.execute(new RemoveObjectCommand(editor, editor.selected));
    } else {
      console.log("no object selected");
    }
  });

  // let rotate = create("button" , "rotate");
  // rotate.innerText = "Rotate";
  // rotate.addEventListener("click" , ()=>{     //rotate
  //   editor.events.transformModeChanged.dispatch("rotate");
  // });

  panel.add(mclone);
  panel.add(deleteobject);
  container.add(panel);
}

function create(elem, id) {
  let ele = document.createElement(elem);
  ele.id = id;
  ele.className = "option";
  return ele;
}

export default DeleteCloneUI;
