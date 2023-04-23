import { UIButton, UIListbox, UIPanel, UIText, UITextArea } from "../../lib/ui.js";
import { AddScriptCommand } from "../Commands/Commands.js";

function AddScriptsUi(editor, container) {
  render(editor, container);
}

function render(editor, container) {
  let h3 = new UIText("Scripts");
  container.add(h3);

  const list = new  UIListbox()
  container.add(list)

  editor.events.objectSelected.add(function () {
    const items = [];
    if(editor.selected != undefined ) {
      console.log(editor.scripts[editor.selected.uuid]);
      list.setItems([
        {
          name: "onStart"
        },
        {
          name: "onInit"
        },
        {
          name: "onTik"
        },{
          name: "onTok"
        },{
          name: "onDestroy"
        },
        {
          name: "onGameEnd"
        }
      ]);
      
      
    } else {
      list.setItems([]);
    }
    list.render();
    console.log(items);
  });
}



export default AddScriptsUi;
