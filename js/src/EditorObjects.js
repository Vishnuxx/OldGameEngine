import * as THREE from "/lib/three.module.js";

// default objecs of editor such as scene , camera etc

const EditorObjects = {
  // camera
  camera: () => {
    let camera =  new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.01,
      10000
    );
    camera.name = "DEFAULT";
    return camera;

  },



  light: () => {
    let skyColor = 0x00aaff;
    var groundColor = 0xffaa00;
    var intensity = 1;

    var light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    light.name = "HemisphereLight";

    return light;
  },

  //renderer
  renderer: (width, height) => {
    let rendererView = new THREE.WebGLRenderer({
      alpha: true,
    });
    rendererView.setClearColor("#222325", 1);
    rendererView.setSize(width, height);
    rendererView.setPixelRatio(window.devicePixelRatio);
    return rendererView;
  },
};

export default EditorObjects;
