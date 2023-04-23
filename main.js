import * as THREE from "/lib/three.module.js";

import TransformControlUI from "./js/UiControls/TransformUi.js";

import Editor from "./js/src/Editor.js";
import ViewPort from "./js/src/ViewPort.js";
import AddObjectUI from "./js/UiControls/AddObjectUi.js";
import UndoRedoUI from "./js/UiControls/UndoRedoUi.js";
import CameraSelector from "./js/UiControls/CameraSelector.js";
import DeleteCloneUI from "./js/UiControls/DeleteCloneUi.js";
import Manifest from "./js/Plugins/manifest/Manifest.js";
import ModelImporter from "./js/UiControls/ModelImporter.js";
import MiscUI from "./js/UiControls/MiscUi.js";
import SceneGraphUI from "./js/UiControls/SceneGraphUi.js";
import ObjecProperties from "./js/UiControls/ObjectProperties.js";
import SaveProjectUI from "./js/UiControls/SaveProjectUi.js";
import Renderer from "./js/src/Renderer.js";
import AddScriptsUi from "./js/UiControls/AddScriptUi.js";
import { UIButton, UIPanel, UITabbedPanel, UIText } from "./lib/ui.js";

let editor = new Editor();

const menubar = new UIPanel().setClass("menubar");
new SaveProjectUI(editor, menubar);
new UndoRedoUI(editor, menubar);
new ModelImporter(editor, menubar);
new CameraSelector(editor, menubar);
new AddObjectUI(editor, menubar);

document.body.appendChild(menubar.dom);

const objectEditor = new UIPanel().setClass("objectEditorPanel");
document.body.appendChild(objectEditor.dom);
new DeleteCloneUI(editor, objectEditor);

document.body.appendChild(page0(editor).dom);

function page0(editor) {
  const page0 = new UIPanel();
  page0.setClass("page");

  const viewportPanel = new UIPanel();
  viewportPanel.setClass("viewport");

  const controllerPanel = new UIPanel();
  controllerPanel.setClass("controller");

  page0.add(viewportPanel);
  page0.add(controllerPanel);
  document.body.appendChild(page0.dom);

  // const bottombar = new UIPanel();
  // bottombar.setClass("bottombar");

  // page1.add(bottombar);

  const container = new UIPanel().addClass("sidepanel");

  const settingsTab = new UIPanel().addClass("panelV");
  new MiscUI(editor, settingsTab);

  const sceneTab = new UIPanel().addClass("panelV");
  new SceneGraphUI(editor, sceneTab);

  const objectTab = new UIPanel().setClass("panelV");

  const scriptTab = new UIPanel().setClass("panelV");
  new AddScriptsUi(editor, scriptTab);

  new TransformControlUI(editor, objectTab);
  new ObjecProperties(editor, objectTab);

  //inside controller panel
  const tabbedpanel = new UITabbedPanel();
  tabbedpanel.setClass("tabbedPanel");

  tabbedpanel.addTab("page0", "Object", objectTab);
  tabbedpanel.addTab("page1", "Script" , scriptTab);
  tabbedpanel.addTab("page2", "Scene", sceneTab);
  tabbedpanel.addTab("page3", "Settings", settingsTab);

  tabbedpanel.select("page0");

  container.add(tabbedpanel);

  new ViewPort(editor, viewportPanel.dom);
  new Renderer(editor);
  //UI

  controllerPanel.add(container);

  return page0;
}

function get(id, event, callback) {
  document.getElementById(id).addEventListener(event, callback);
}
