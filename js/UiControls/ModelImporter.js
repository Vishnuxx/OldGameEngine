import { GLTFLoader } from "../../lib/3Libs/GLTFLoader.js";
import { AddObjectCommand } from "../Commands/AddObjectCommand.js";
import { DRACOLoader } from "../../lib/3Libs/DRACOLoader.js";
import { ObjectLoader } from "../../lib/three.module.js";
import {UIButton , UIPanel} from "../../lib/ui.js";

function ModelImporter(editor, container) {
const panel = new UIPanel();
panel.setClass("panelH");
// panel.setInnerHTML("ModelImport");

  let importmodel = new UIButton("Import");
  importmodel.onClick( () => {
    const loader = new GLTFLoader();
    var dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("../../model2/");
    loader.setDRACOLoader(dracoLoader);
    loader.load(
      "../../model2/model.gltf",
      function (gltf) {
        console.log(gltf.scene)
        editor.execute(new AddObjectCommand(editor, gltf.scene));
        gltf.scene.traverse((object)=>{
          
        });
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
  });

  let skybox = new UIButton("Add Skybox") ; //create("button", "skybox");
 
  skybox.onClick( () => {
    editor.addSkyBox("../../image3.png");
  });

  panel.add(importmodel);
  panel.add(skybox);
  container.add(panel)
}



export default ModelImporter;
