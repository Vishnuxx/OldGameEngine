import {
  Scene,
  MeshBasicMaterial,
  SphereGeometry,
  CameraHelper,
  PointLightHelper,
  DirectionalLightHelper,
  SpotLightHelper,
  HemisphereLightHelper,
  SkeletonHelper,
  Mesh,
  Fog,
  FogExp2,
  ObjectLoader,
} from "/lib/three.module.js";
import EditorObjects from "./EditorObjects.js";
import { History as _History } from "../History/History.js";
import EventManager from "./EventManager.js";

function Editor() {
  this.history = new _History(this);

  this.scene = new Scene(); //default scene
  this.viewportCamera = EditorObjects.camera().clone(); //default Camera
  this.light = EditorObjects.light(); //default light
  this.renderer = EditorObjects.renderer(window.innerWidth, window.innerHeight); //default renderer

  //this.objects = {}; //collection of objects used
  this.geometries = {}; //collection of geometries used
  this.materials = {}; //collection of materials used
  this.textures = {}; //collection of textures used
  this.cameras = {}; //collection of textures used
  this.scripts = {}; //collection of scripts

  this.showSceneHelpers = true;
  this.sceneHelpers = new Scene(); //scene layer to scene helpers (eg: transform controls)
  this.helpers = {}; //key(uuid) value(object) pairs of scene helpers

  this.sceneGraph = {}; // to view scene tree

  this.selected = null; // stores selected object

  this.clonedObject = null; // stores the current cloned object

  this.events = new EventManager();

  this.camera = this.viewportCamera;
  this.addCamera(this.camera);
}

Editor.prototype = {
  setScene: function (scene) {
    this.scene.uuid = scene.uuid;
    this.scene.name = scene.name;

    this.scene.background = scene.background;
    this.scene.environment = scene.environment;
    this.scene.fog = scene.fog;

    this.scene.userData = JSON.parse(JSON.stringify(scene.userData));

    // avoid render per object

    this.events.sceneGraphChanged.active = false;

    while (scene.children.length > 0) {
      this.addObject(scene.children[0]);
    }

    this.events.sceneGraphChanged.active = true;
    this.events.sceneGraphChanged.dispatch();
  },

  addGeometry: function (geometry) {
    this.geometries[geometry.uuid] = geometry;
  },

  addMaterial: function (material) {
    if (Array.isArray(material)) {
      for (var i = 0, l = material.length; i < l; i++) {
        //this.addMaterialToRefCounter(material[i]);
        this.materials[material.uuid] = material[i];
      }
    } else {
      //this.addMaterialToRefCounter(material);
      this.materials[material.uuid] = material;
    }
    //this.signals.materialAdded.dispatch();
  },

  removeMaterial: function (material) {
    if (Array.isArray(material)) {
      for (var i = 0, l = material.length; i < l; i++) {
        //this.removeMaterialFromRefCounter(material[i]);
        delete this.materials[material.uuid];
      }
    } else {
      //this.removeMaterialFromRefCounter(material);
      delete this.materials[material.uuid];
    }

    //this.signals.materialRemoved.dispatch();
  },

  addObject: function (object, parent, index) {
    var scope = this;
    object.traverse(function (child) {
      if (child.geometry !== undefined) scope.addGeometry(child.geometry);
      if (child.material !== undefined) scope.addMaterial(child.material);

      scope.addCamera(child);
      scope.addHelper(child);
    });

    scope.addScript(object)
    if (parent === undefined) {
      this.scene.add(object);
    } else {
      parent.children.splice(index, 0, object);
      object.parent = parent;
    }

    this.events.objectAdded.dispatch(object);
    this.events.sceneGraphChanged.dispatch();
  },

  removeObject: function (object) {
    if (object.parent === null) return; // avoid deleting the camera or scene

    var scope = this;

    object.traverse(function (child) {
      scope.removeCamera(child);
      scope.removeHelper(child);
      if (child.material !== undefined) scope.removeMaterial(child.material);
    });

    scope.removeScript(object);
    object.parent.remove(object);

    this.events.objectRemoved.dispatch(object);
    this.events.sceneGraphChanged.dispatch();
  },

  addScript: function (object) {
    const scriptobj = {
      localvars: {},
      onStart: "function(){}",
      onInit: "function(){}",
      onTik: "function(){}",
      onTok: "function(){}",
      onDestroy: "function(){}",
      onGameEnd: "function(){}",
    };

    if (this.scripts[object.uuid] === undefined) {
      this.scripts[object.uuid] = [];
    }
    //this.scripts[object.uuid].push(script);
    this.scripts[object.uuid] = { ...scriptobj };
    this.events.scriptAdded.dispatch(scriptobj);
  },

  removeScript: function (object) {
    if (this.scripts[object.uuid] === undefined) return;

    delete this.scripts[object.uuid];

    this.signals.scriptRemoved.dispatch(script);
  },

  setViewportCamera: function (uuid) {
    this.viewportCamera = this.cameras[uuid];
    this.events.viewportCameraChanged.dispatch();
  },

  addCamera: function (camera) {
    if (camera.isCamera) {
      this.cameras[camera.uuid] = camera;

      this.events.cameraAdded.dispatch(camera);
      this.events.sceneGraphChanged.dispatch();
    }
  },

  removeCamera: function (camera) {
    if (this.cameras[camera.uuid] !== undefined) {
      delete this.cameras[camera.uuid];

      this.events.cameraRemoved.dispatch(camera);
      this.events.sceneGraphChanged.dispatch();
    }
  },

  addHelper: (function () {
    var geometry = new SphereGeometry(2, 4, 2);
    var material = new MeshBasicMaterial({
      color: 0xff0000,
      visible: false,
    });

    return function (object, helper) {
      if (helper === undefined) {
        if (object.isCamera) {
          helper = new CameraHelper(object);
        } else if (object.isPointLight) {
          helper = new PointLightHelper(object, 1);
        } else if (object.isDirectionalLight) {
          helper = new DirectionalLightHelper(object, 1);
        } else if (object.isSpotLight) {
          helper = new SpotLightHelper(object);
        } else if (object.isHemisphereLight) {
          helper = new HemisphereLightHelper(object, 1);
        } else if (object.isSkinnedMesh) {
          helper = new SkeletonHelper(object.skeleton.bones[0]);
        } else {
          return;
        }

        var picker = new Mesh(geometry, material);
        picker.name = "picker";
        picker.userData.object = object;
        helper.add(picker);
      }

      this.sceneHelpers.add(helper);
      this.helpers[object.id] = helper;

      this.events.helperAdded.dispatch(helper);
    };
  })(),

  removeHelper: function (object) {
    if (this.helpers[object.id] !== undefined) {
      var helper = this.helpers[object.id];
      helper.parent.remove(helper);

      delete this.helpers[object.id];

      this.events.helperRemoved.dispatch(helper);
    }
  },

  addSkyBox: function (path) {
    this.events.sceneBackgroundChanged.dispatch(path);
  },

  setFog: function (enabled, type, fog_properties) {
    if (enabled) {
      let LINEAR = 0;
      let EXPONENTIAL = 1;

      switch (type) {
        case LINEAR:
          this.scene.fog = new Fog(
            fog_properties.color,
            fog_properties.near,
            fog_properties.far
          );
          break;

        case EXPONENTIAL:
          this.scene.fog = new FogExp2(
            fog_properties.color,
            fog_properties.density
          );
          break;
      }
    } else {
      this.scene.fog = null;
    }

    this.events.fogSettingsChanged.dispatch();
  },

  showSceneHelpers: function (isTrue) {
    this.events.showSceneHelpers.dispatch(isTrue);
  },

  selectObjectByUUID: function (uuid) {
    var scope = this;

    this.scene.traverse(function (child) {
      if (child.uuid === uuid) {
        scope.select(child);
      }
    });
  },

  select: function (object) {
    if (this.selected === object) return;
    this.selected = object;

    this.events.objectSelected.dispatch(object);
    this.events.sceneGraphChanged.dispatch();
  },

  deselect: function () {
    this.selected = null;
    //this.events.sceneGraphChanged.dispatch();
  },

  execute: function (cmd, optionalName) {
    this.history.execute(cmd, optionalName);
  },

  undo: function () {
    this.history.undo();
  },

  redo: function () {
    this.history.redo();
  },

  fromJSON: async function (json) {
    var loader = new ObjectLoader();
    var camera = await loader.parseAsync(json.camera);

    this.camera.copy(camera);
    //this.signals.cameraResetted.dispatch();

    this.history.fromJSON(json.history);
    this.scripts = json.scripts;

    this.setScene(await loader.parseAsync(json.scene));
  },

  toJSON: function () {
    // scripts clean up

    var scene = this.scene;
    var scripts = this.scripts;

    for (var key in scripts) {
      var script = scripts[key];

      if (
        script.length === 0 ||
        scene.getObjectByProperty("uuid", key) === undefined
      ) {
        delete scripts[key];
      }
    }

    //

    return {
      metadata: {},
      project: {
        // 	shadows: this.config.getKey("project/renderer/shadows"),
        // 	shadowType: this.config.getKey("project/renderer/shadowType"),
        // 	vr: this.config.getKey("project/vr"),
        // 	physicallyCorrectLights: this.config.getKey(
        // 		"project/renderer/physicallyCorrectLights"
        // 	),
        // 	toneMapping: this.config.getKey("project/renderer/toneMapping"),
        // 	toneMappingExposure: this.config.getKey(
        // 		"project/renderer/toneMappingExposure"
        // 	),
      },
      camera: this.camera.toJSON(),
      scene: this.scene.toJSON(),
      scripts: this.scripts,
      history: this.history.toJSON(),
    };
  },
};

export default Editor;
