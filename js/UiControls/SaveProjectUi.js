import { UIButton } from "../../lib/ui.js";

function SaveProjectUI(editor, container) {
  let saveSceneButton = new UIButton("Save project");

  saveSceneButton.onClick( () => {
    var output = editor.scene.toJSON();
    try {
      output = JSON.stringify(output, null, "\t");
      output = output.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, "$1");
    } catch (e) {
      output = JSON.stringify(output);
    }
    exportProject(output, "VisualSparkScene.json");
  });

  container.add(saveSceneButton);
}

function exportProject(data, filename) {
  var link = document.createElement("a");

  save(new Blob([data], { type: "text/plain" }), filename);

  function save(blob, filename) {
    if (link.href) {
      URL.revokeObjectURL(link.href);
    }
    link.href = URL.createObjectURL(blob);
    link.download = filename || "data.json";
    link.dispatchEvent(new MouseEvent("click"));
  }
}


export default SaveProjectUI;
