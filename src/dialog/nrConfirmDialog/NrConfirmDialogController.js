import _ from 'lodash';
import Request from "../../../../work-assistant/backend/src/models/Request";

const PRIVATE = {
};


export class NrConfirmDialogController {

	static getBindings () {
		return {
			model: "<nrModel",
			action: "<nraAtion"
		};
	}


	constructor () {
		this._model = undefined;
		console.log('confirm dialog constructed')
	}

	set model (value) {
		this._model = value;
	}

	get model () {
		return this._model;
	}

	set action (value) {
		this._action = value;
	}

	executeAction () {
		this._action(this.model.action);
	}

}
