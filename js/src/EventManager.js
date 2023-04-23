export default function EventManager() {
  const Event = signals.Signal;
  this.cameraAdded = new Event();
  this.cameraRemoved = new Event();

  this.fogSettingsChanged = new Event();

  this.historyChanged = new Event();
  this.helperAdded = new Event();
  this.helperRemoved = new Event();

  this.materialAdded = new Event();
  this.materialRemoved = new Event();

  this.objectSelected = new Event();
  this.objectPropertychanged = new Event();
  this.objectFocused = new Event();
  this.objectAdded = new Event();
  this.objectRemoved = new Event();

  this.rendererCreated = new Event();

  this.sceneBackgroundChanged = new Event();
  this.showSceneHelpers = new Event();
  this.sceneGraphChanged = new Event();
  this.scriptAdded = new Event();
  this.scriptRemoved = new Event();

  this.transformModeChanged = new Event();

  this.viewportCameraChanged = new Event();
  this.viewportResized = new Event();

  
}
