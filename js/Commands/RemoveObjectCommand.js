import { Command } from '../History/Command.js';
//import { ObjectLoader } from '../../build/three.module.js';

/**
 * @param editor Editor
 * @param object THREE.Object3D
 * @constructor
 */
class RemoveObjectCommand extends Command {

	constructor( editor, object ) {
		super( editor );
		this.type = 'RemoveObjectCommand';
		this.object = object;
		if ( object !== undefined ) {

			this.name = `Add Object: ${object.name}`;

		}

	}

	execute() {

		this.editor.removeObject( this.object );
		this.editor.deselect();

	}

	undo() {

		this.editor.addObject( this.object );
        this.editor.select( this.object );
		

	}

	toJSON() {

		const output = super.toJSON( this );

		output.object = this.object.toJSON();

		return output;

	}

	fromJSON( json ) {

		super.fromJSON( json );

		this.object = this.editor.objectByUuid( json.object.object.uuid );

		if ( this.object === undefined ) {

			//const loader = new ObjectLoader();
			//this.object = loader.parse( json.object );

		}

	}

}

export { RemoveObjectCommand };
