import * as THREE from "../../lib/three.module.js";


import { EditorControls } from "./EditorControls.js";
import EditorObjects from "./EditorObjects.js";

import { SetPositionCommand } from "../Commands/Tools/SetPositionCommand.js";
import { SetRotationCommand } from "../Commands/Tools/SetRotationCommand.js";
import { SetScaleCommand } from "../Commands/Tools/SetScaleCommand.js";
import Renderer from "./Renderer.js";
import { ViewportResizer } from "./Viewport.Resizer.js";
import { initObjectPicking } from "./Viewport.ObjectPicker.js";
import setUpTransformControls from "./Viewport.transformControls.js";
//import Renderer from "./Renderer.js";

function ViewPort(editor , container) {
  const scope = this;

  let events = editor.events;
  let bounds = container.getBoundingClientRect();
  let camera = editor.camera;
  let scene = editor.scene;
  let scenehelpers = editor.sceneHelpers;
  let currentSelection = editor.selected;
  var objects = scene.children; //used for object picking
  let showSceneHelpers = true;
  var grid1;
  let renderer = editor.renderer;
  this.transformControl = null;
  this.orbitControls = null;
  this.boxHelper = null;

  this.renderViewport = () => {
    updateAspectRatio();
    renderer.setViewport(0, 0, container.offsetWidth, container.offsetHeight);

    scope.boxHelper.update();
    if (showSceneHelpers === true) {
      scene.add(scenehelpers);
    }
    renderer.render(scene, camera);
    scene.remove(scenehelpers);
  };

  initMain();

  function initMain() {
    camera.position.z = 5;
    initHelpers();

    setUpTransformControls(editor , scope ,container);
    initObjectPicking(editor,scope , container);

   

    window.addEventListener("resize", () => {
      //updateAspectRatio();
      scope.renderViewport();
      console.log("SD");
    });
  }

  

  //rendering
  


  function initHelpers() {
    scope.orbitControls = new EditorControls(camera, container);
    scope.orbitControls.addEventListener("change", () => scope.renderViewport());

    grid1 = createGridHelper(true);
    scenehelpers.add(grid1);

    scope.boxHelper = new THREE.BoxHelper();
    scope.boxHelper.material.depthTest = false;
    scope.boxHelper.material.transparent = true;
    scope.boxHelper.material.color.g = 0.5;

    scenehelpers.add(scope.boxHelper);
  }


 

  function updateAspectRatio() {
    camera.aspect = bounds.width / bounds.height;
    camera.updateProjectionMatrix();
  }

  function createGridHelper(horizontal) {
    let grid = new THREE.GridHelper(1000, 500);
    if (horizontal) {
      grid.rotation.z = 0;
    } else {
      grid.rotation.z = Math.PI / 2;
    }
    return grid;
  }

  // events

  events.rendererCreated.add(function (newRenderer) {
    if (renderer !== null) {
      renderer.setAnimationLoop(null);
      renderer.dispose();

      // container.removeChild(renderer.domElement);
    }

    renderer = newRenderer;
    renderer.setClearColor("#222325", 1);
    renderer.setSize(bounds.width, bounds.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    scope.renderViewport();
  });

  events.objectPropertychanged.add(function (object) {
    if (currentSelection === object) {
      scope.boxHelper.setFromObject(object);
    }

    if (object.isPerspectiveCamera) {
      object.updateProjectionMatrix();
    }

    scope.renderViewport();
  });

  events.objectFocused.add(function (object) {
    scope.orbitControls.focus(object);
  });

  events.transformModeChanged.add(function (mode) {
    scope.transformControl.setMode(mode);
  });

  events.helperAdded.add(function (object) {
    var picker = object.getObjectByName("picker");
    if (picker !== undefined) {
      objects.push(picker);
    }
  });

  events.helperRemoved.add(function (object) {
    var picker = object.getObjectByName("picker");
    if (picker !== undefined) {
      objects.splice(objects.indexOf(picker), 1);
    }
  });

  events.objectSelected.add(function (object) {
    if (showSceneHelpers) {
      currentSelection = object;
      scope.transformControl.detach();
      if (object !== null && object !== scene && object !== camera) {
        scope.boxHelper.setFromObject(object);
        scope.boxHelper.visible = true;
        scope.transformControl.attach(object);
      }
    }
    scope.renderViewport();
  });

  events.objectAdded.add(function (object) {
    object.traverse(function (child) {
      objects.push(child);
    });
  });

  events.objectRemoved.add(function (object) {
    scope.orbitControls.enabled = true;
    if (object === scope.transformControl.object) {
      scope.transformControl.detach();
      scope.boxHelper.visible = false;
    }

    object.traverse(function (child) {
      objects.splice(objects.indexOf(child), 1);
    });
    scope.renderViewport();
  });

  events.viewportCameraChanged.add(function () {
    camera = editor.viewportCamera;
    scope.orbitControls.camera = camera;
    let viewportCamera = camera;
    if (viewportCamera.isPerspectiveCamera) {
      viewportCamera.aspect = editor.camera.aspect;
      viewportCamera.projectionMatrix.copy(editor.camera.projectionMatrix);
    } else if (viewportCamera.isOrthographicCamera) {
    }
    scope.orbitControls.enabled = editor.viewportCamera === editor.camera;
    scope.renderViewport();
  });

  events.sceneBackgroundChanged.add(function (path) {
    const loader = new THREE.TextureLoader();

    const texture = loader.load(path, () => {
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
      rt.fromEquirectangularTexture(renderer, texture);
      scene.background = rt.texture;
      scope.renderViewport();
    });
  });

  events.showSceneHelpers.add(function (isTrue) {
    if (isTrue) {
      showSceneHelpers = true;
    } else {
      showSceneHelpers = false;
    }
    scope.renderViewport();
  });

  events.fogSettingsChanged.add(function () {
    scope.renderViewport();
  });
}



export default ViewPort;
