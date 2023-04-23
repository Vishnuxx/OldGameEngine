import * as THREE from "../../lib/three.module.js";
import { UIButton, UIPanel, UISelect } from "../../lib/ui.js";

import { AddObjectCommand } from "../Commands/Commands.js";
import { addObject } from "../EditorAPI/AddObject.js";

function AddObjectUI(editor, container) {
  const panel = new UIPanel();
  panel.setClass("panelH");
  panel.setInnerHTML("ADD Object");

  let select = new UISelect(); // create("select", "objecttype");
  const options = {
    NONE: "NONE",
    plane: "plane",
    box: "box",
    cylinder: "cylinder",
    sphere: "sphere",
    torus: "torus",
    tube: "tube",
    ambientlight: "ambientlight",
    pointlight: "pointlight",
    perspectivecamera: "perspectivecamera",
    OrthographicCamera: "OrthographicCamera",
    directionalLight: "directionalLight",
  };
  select.setOptions(options);

  // for (let option of options) {
  //   let mOption = create("option", option);
  //   mOption.value = option;
  //   mOption.text = option;
  //   select.appendChild(mOption);
  // }

  select.onChange(() => {});

  let add = new UIButton("ADD");
  add.onClick(() => {
    console.log(select.getValue());
    addObject(editor , select.getValue());
  });



  panel.add(select);
  panel.add(add);
  container.add(panel);
}




export default AddObjectUI;
