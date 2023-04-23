import { Raycaster, Vector3, Vector2 ,} from "/lib/three.module.js";

let raycaster = new Raycaster();
let mouse = new Vector3();

var onDownPosition = new Vector2();
var onUpPosition = new Vector2();
var onDoubleClickPosition = new Vector2();

export function initObjectPicking(editor , viewport , container) {
  const scene = editor.scene;
  const camera = editor.camera;
  const objects = editor.scene.children;
  const events = editor.events;
  const transformControl = viewport.transformControl;
  const boxHelper = viewport.boxHelper
  const renderViewport = viewport.renderViewport;
  


 function getIntersects(point) {
   mouse.set(point.x * 2 - 1, -(point.y * 2) + 1);
   raycaster.setFromCamera(mouse, camera);
   return raycaster
     .intersectObjects(scene.children, false)
     .filter((intersect) => {
       return intersect.object.visible === true;
     });
 }
 
  function getMousePosition(dom, x, y) {
    var rect = dom.getBoundingClientRect();
    return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
  }

  

  const findAndSelect = () => {
    if (onDownPosition.distanceTo(onUpPosition) === 0) {

      var intersects = getIntersects(onUpPosition, objects);
      transformControl.detach();
      boxHelper.visible = false;

      if (intersects.length > 0) {
        var object = intersects[0].object;
        if (object.userData.object !== undefined) {
          editor.select(object.userData.object);
          // editor.select(object);
        } else {
          editor.select(object);
        }
      } else {
        editor.select(null);
      }
      renderViewport();
    }
  }

  function onDoubleClick(event) {
    var array = getMousePosition(container, event.clientX, event.clientY);
    onDoubleClickPosition.fromArray(array);
    var intersects = getIntersects(onDoubleClickPosition, objects);
    if (intersects.length > 0) {
      var intersect = intersects[0];
      events.objectFocused.dispatch(intersect.object);
    }
  }

  function onMouseDown(event) {
    // event.preventDefault();
    var array = getMousePosition(container, event.offsetX, event.offsetY);
    onDownPosition.fromArray(array);
    document.addEventListener("mouseup", onMouseUp, false);
  }

  function onMouseUp(event) {
    var array = getMousePosition(container, event.offsetX, event.offsetY);
    onUpPosition.fromArray(array);
    findAndSelect();
    document.removeEventListener("mouseup", onMouseUp, false);
  }

  function onTouchStart(event) {
    var touch = event.changedTouches[0];
    var array = getMousePosition(container, touch.offsetX, touch.offsetY);
    onDownPosition.fromArray(array);
    document.addEventListener("touchend", onTouchEnd, false);
  }

  function onTouchEnd(event) {
    var touch = event.changedTouches[0];
    var array = getMousePosition(container, touch.offsetX, touch.offsetY);
    onUpPosition.fromArray(array);
    findAndSelect();
    document.removeEventListener("touchend", onTouchEnd, false);
  }

  container.addEventListener("mousedown", onMouseDown, false);
  container.addEventListener("touchstart", onTouchStart, false);
  container.addEventListener("dblclick", onDoubleClick, false);
}



