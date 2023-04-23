import * as THREE from "/lib/three.module.js";

function Renderer(editor){
    let currentRenderer = null;
   
		currentRenderer = new THREE.WebGLRenderer({alpha:true , antialias: false});// { antialias: antialiasBoolean.getValue() } );
		currentRenderer.outputEncoding = THREE.sRGBEncoding;
		// currentRenderer.physicallyCorrectLights = physicallyCorrectLightsBoolean.getValue();
		// currentRenderer.shadowMap.enabled = shadowsBoolean.getValue();
		// currentRenderer.shadowMap.type = parseFloat( shadowTypeSelect.getValue() );
		// currentRenderer.toneMapping = parseFloat( toneMappingSelect.getValue() );
		// currentRenderer.toneMappingExposure = toneMappingExposure.getValue();

		editor.events.rendererCreated.dispatch( currentRenderer );
		//signals.rendererUpdated.dispatch();


}

export default Renderer;