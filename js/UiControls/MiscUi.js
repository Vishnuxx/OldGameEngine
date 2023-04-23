import {UIButton , UICheckbox , UIPanel , UISelect, UIText} from "../../lib/ui.js"

function MiscUI(editor, container) {
    const panel = new UIPanel();
    panel.setClass("panel");
    panel.setInnerHTML("MISC");
    //show scene helper


   
    const sceneHelperText = new UIText("show scene helpers");
    let scenehelper = new UICheckbox("checkbox") //create("input", "showSceneHelper");
    scenehelper.setInnerHTML("show scene helpers");
    scenehelper.onChange(() => {
        editor.showSceneHelpers(scenehelper.getValue());
       
    });
  
    panel.add(new UIPanel().add(sceneHelperText).add(scenehelper));

    //fog controller
    

  
    const fogpanel = new UIPanel();
    let fog_controller = new UICheckbox();

    fog_controller.onChange(() => {
        editor.setFog( fog_controller.getValue() , 1 , {
            color: "skyblue" , 
            density: 0.01
        })

        if(fog_controller.getValue() ) {
          const select = new UISelect();
          select.setOptions({
            "Linear" : "LINEAR",
            "Exponential" : "EXPONENTIAL"
          });
          fogpanel.add(select);
          select.setValue("Linear");
          
        } else {
          fogpanel.setInnerHTML("");
        }
        
    });
  
    panel.add(new UIPanel().add(new UIText("Fog").add(fog_controller).add(fogpanel)));

    container.add(panel);

    /*
    type 
      linear = {
        color: "skyblue" , 
        near : 1 , 
        far : 1000
      }

      exponential = {
            color: "skyblue" , 
            density: 0.01
        }
    */

    
  }
  
  
  
  export default MiscUI;