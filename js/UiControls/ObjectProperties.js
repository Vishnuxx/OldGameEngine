import {
  UIButton,
  UINumber,
  UIPanel,
  UIText,
  UITextArea,
} from "../../lib/ui.js";

function ObjecProperties(editor, container) {
  const panel = new UIPanel();
  panel.setClass("panel");


  panel.add(meshDataUI(editor, container)).add(dataUI(editor, container));
   
  
  container.add(panel);
}

function dataUI(editor, container) {
  const section = new UIPanel();

  let h3 = new UIText("Data");

  section.add(h3);

  let group1 = new UITextArea();
  let button1 = new UIButton("SaveChanges");
  group1.contentEditable = true;

  button1.onClick(() => {
    if (editor.selected !== null) {
      editor.selected.userData = JSON.parse(group1.getValue());
      console.log("saved");
    }
  });

  section.add(group1);
  section.add(button1);

  editor.events.objectSelected.add(function () {
    group1.innerText = "";
    if (editor.selected !== null) {
      group1.setTextContent(
        JSON.stringify(editor.selected.userData, undefined, " ")
      );
    }
  });
  return section;
}

function meshDataUI(editor, container) {
  const section = new UIPanel().addClass("panelV");
  let h3 = new UIText("Transforms");
  section.add(h3);

  section.add(
    new UIPanel()
      .addClass("panelH")
      .add(new UIText("Position:"))
      .add(new UINumber())
      .add(new UINumber())
      .add(new UINumber())
  );
  section.add(
    new UIPanel()
      .addClass("panelH")
      .add(new UIText("Rotation:"))
      .add(new UINumber())
      .add(new UINumber())
      .add(new UINumber())
  );
  section.add(
    new UIPanel()
      .addClass("panelH")
      .add(new UIText("Scale:"))
      .add(new UINumber())
      .add(new UINumber())
      .add(new UINumber())
  );

  return section;
}




export default ObjecProperties;
