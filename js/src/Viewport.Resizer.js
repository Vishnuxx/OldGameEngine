const setSize = (container , camera , renderer) => {
      camera.aspect = container.clientWidth / container.clientHeight;

      camera.updateProjectionMatrix();
      // update the size of the renderer AND the canvas
      renderer.setSize(container.clientWidth, container.clientHeight);
      
      // set the pixel ratio (for mobile devices)
     renderer.setPixelRatio(window.devicePixelRatio);
      
}

class ViewportResizer {
  constructor(container, camera, renderer) {
    setSize(container, camera, renderer);
    window.addEventListener("resize", () => {
      setSize(container, camera, renderer);
      this.onResize();
      
    });
  }

  onResize() {

  }
}

export { ViewportResizer };
