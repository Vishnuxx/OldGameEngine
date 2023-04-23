import { TransformControls } from "../../lib/3Libs/TransformControls.js";
import { SetPositionCommand, SetRotationCommand, SetScaleCommand } from "../Commands/Commands.js";

var objectPositionOnDown = null;
var objectRotationOnDown = null;
var objectScaleOnDown = null;

export default function setUpTransformControls(editor , viewport , container) {

  const camera = editor.camera;
  const scenehelpers = editor.sceneHelpers;
  const orbitControls = viewport.orbitControls;

  console.log(viewport)
  //transform controls
  viewport.transformControl = new TransformControls(camera, container);
  scenehelpers.add(viewport.transformControl);

  viewport.transformControl.addEventListener("dragging-changed", (event) => {
    orbitControls.enabled = !event.value;
  });

  viewport.transformControl.addEventListener("change", (event) => {
    viewport.renderViewport();
  });

  viewport.transformControl.addEventListener("mouseDown", function (event) {
    var object = viewport.transformControl.object;
    objectPositionOnDown = object.position.clone();
    objectRotationOnDown = object.rotation.clone();
    objectScaleOnDown = object.scale.clone();
  });

  viewport.transformControl.addEventListener("mouseUp", function (event) {
    var object = viewport.transformControl.object;
    if (object !== undefined) {
      switch (viewport.transformControl.getMode()) {
        case "translate":
          if (!objectPositionOnDown.equals(object.position)) {
            editor.execute(
              new SetPositionCommand(
                editor,
                object,
                object.position,
                objectPositionOnDown
              )
            );
          }

          break;

        case "rotate":
          if (!objectRotationOnDown.equals(object.rotation)) {
            editor.execute(
              new SetRotationCommand(
                editor,
                object,
                object.rotation,
                objectRotationOnDown
              )
            );
          }

          break;

        case "scale":
          if (!objectScaleOnDown.equals(object.scale)) {
            editor.execute(
              new SetScaleCommand(
                editor,
                object,
                object.scale,
                objectScaleOnDown
              )
            );
          }

          break;
      }
    }
  });

  viewport.transformControl.attach(undefined);
}
