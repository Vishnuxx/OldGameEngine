import { Command } from '../History/Command.js';
//import { ObjectLoader } from '../../build/three.module.js';

/**
 * @param editor Editor
 * @param object THREE.Object3D
 * @constructor
 */
class AddScriptCommand extends Command {

	constructor( editor , object , script) {
		super( editor );
		this.type = 'AddScriptCommand';
		this.object = object;
        this.newScript = script;
        this.oldScript = (editor.scripts[object.uuid] !== undefined)? editor.scripts[object.uuid] : "function update(){ \n }";
		if ( object !== undefined ) {
			this.name = `Add Script: ${object.name}`;
            
		}

	}

	execute() {

		this.editor.addScript(this.object , this.newScript );

	}

	undo() {

		this.editor.addScript(this.object , this.oldScript);

	}

	toJSON() {

		// const output = super.toJSON( this );

		// output.object = this.object.toJSON();

		// return output;

	}

	fromJSON( json ) {

		// super.fromJSON( json );

		// this.object = this.editor.objectByUuid( json.object.object.uuid );

		// if ( this.object === undefined ) {

		// 	//const loader = new ObjectLoader();
		// 	//this.object = loader.parse( json.object );

		//}

	}

}

export { AddScriptCommand };
