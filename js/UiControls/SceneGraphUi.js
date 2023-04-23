import { UISelect , UIPanel } from "../../lib/ui.js";

function SceneGraphUI(editor  , container){
    const panel = new UIPanel();
    panel.setClass("panel");
    panel.setInnerHTML("Scene Graph");

    let select = new UISelect(); 
    let option;
    
    //select.innerText = "Translate";
    select.onChange(()=>{  //translate
      editor.selectObjectByUUID(select.value);
    });
  
    editor.events.sceneGraphChanged.add(function(){
        //select.innerHTML = "";
        editor.scene.traverse(function(child){
            option = {};
            option[child.uuid] = child.name;
          });
        select.setOptions(option);
    });


    panel.add(select)
    container.add(panel);

}


export default SceneGraphUI;