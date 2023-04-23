import {
  PlaneGeometry,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  BoxGeometry,
  CylinderGeometry,
  Mesh,
  SphereGeometry,
  TorusGeometry,
  CatmullRomCurve3,
  TubeGeometry,
  AmbientLight,
  PointLight,
  DirectionalLight,
  PerspectiveCamera,
  OrthographicCamera,
  Vector3,

} from "../../lib/three.module.js";
import { AddObjectCommand } from "../Commands/AddObjectCommand.js";

export const addObject = (editor , type) => {
  switch (type) {
    case "plane":
      var geometry = new PlaneGeometry(50, 50, 100, 100);
      var material = new MeshStandardMaterial();
      var mesh = new Mesh(geometry, material);
      mesh.name = "Plane";

      editor.execute(new AddObjectCommand(editor, mesh));
      break;

    case "box":
      var geometry = new BoxGeometry().clone();
      var mesh = new Mesh(
        geometry,
        new MeshPhysicalMaterial().clone()
      );

      editor.execute(new AddObjectCommand(editor, mesh));
      break;

    case "cylinder":
      var geometry = new CylinderGeometry(
        1,
        1,
        1,
        8,
        1,
        false,
        0,
        Math.PI * 2
      );
      var mesh = new Mesh(geometry, new MeshStandardMaterial());
      mesh.name = "Cylinder";
      editor.execute(new AddObjectCommand(editor, mesh));
      break;

    case "sphere":
      var geometry = new SphereGeometry(
        1,
        32,
        16,
        0,
        Math.PI * 2,
        0,
        Math.PI
      );
      var mesh = new Mesh(geometry, new MeshStandardMaterial());
      mesh.name = "Sphere";

      editor.execute(new AddObjectCommand(editor, mesh));
      break;

    case "torus":
      var geometry = new TorusGeometry(1, 0.4, 8, 6, Math.PI * 2);
      var mesh = new Mesh(geometry, new MeshStandardMaterial());
      mesh.name = "Torus";
      geometry.computeVertexNormals();
      editor.execute(new AddObjectCommand(editor, mesh));
      break;

    case "tube":
      var path = new CatmullRomCurve3([
        new Vector3(2, 2, -2),
        new Vector3(2, -2, -0.6666666666666667),
        new Vector3(-2, -2, 0.6666666666666667),
        new Vector3(-2, 2, 2),
      ]);

      var geometry = new TubeGeometry(path, 64, 1, 8, false);
      var mesh = new Mesh(geometry, new MeshStandardMaterial());
      mesh.name = "Tube";

      editor.execute(new AddObjectCommand(editor, mesh));
      break;

    case "ambientlight":
      var color = 0x222222;

      var light = new AmbientLight(color);
      light.name = "AmbientLight";

      editor.execute(new AddObjectCommand(editor, light));

      break;

    case "pointlight":
      var color = 0xffffff;
      var intensity = 1;
      var distance = 10;

      var light = new PointLight(color, intensity, distance);
      light.name = "PointLight";

      editor.execute(new AddObjectCommand(editor, light));
      break;

    case "directionalLight":
      var color = 0xffffff;
      var intensity = 1;

      var light = new DirectionalLight(color, intensity);
      light.name = "DirectionalLight";
      light.target.name = "DirectionalLight Target";

      light.position.set(5, 10, 7.5);

      editor.execute(new AddObjectCommand(editor, light));
      break;

    case "perspectivecamera":
      var camera = new PerspectiveCamera();
      camera.name = "PerspectiveCamera";

      editor.execute(new AddObjectCommand(editor, camera));
      break;

    case "OrthographicCamera":
      var aspect = editor.camera.aspect;
      var camera = new OrthographicCamera(-aspect, aspect);
      camera.name = "OrthographicCamera";

      editor.execute(new AddObjectCommand(editor, camera));
      break;
  }

  editor.events.sceneGraphChanged.dispatch();
};
