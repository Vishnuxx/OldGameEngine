import { UISelect, UIPanel, UIText } from "../../lib/ui.js";

function CameraSelector(editor, container) {
  const panel = new UIPanel();
  panel.setClass("panelH");
  panel.add(new UIText("Camera").setStyle("fontSize", "3px"));

  let select = new UISelect();
  select.setOptions(editor.cameras);

  select.onChange(() => {
    //translate

    editor.setViewportCamera(select.getValue());
    console.log("camera selector");
  });

  editor.events.cameraAdded.add(update);
  editor.events.cameraRemoved.add(update);

  update();
  panel.add(select);
  container.add(panel);

  function update() {
    select.setOptions(editor.cameras);
  }
}

export default CameraSelector;
