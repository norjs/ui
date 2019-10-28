import _ from 'lodash';
import Request from "../../../../work-assistant/models/models/Request";
import LogUtils from "@norjs/utils/Log";

const nrLog = LogUtils.getLogger('nrConfirmDialogController');

/**
 *
 * @enum {Symbol}
 * @readonly
 */
const PRIVATE = {
	MODEL: Symbol('_model')
};

export class NrConfirmDialogController {

	static getBindings () {
		return {
			model: "<nrModel"
		};
	}

	constructor () {

		/**
		 *
		 * @member {undefined}
		 */
		this[PRIVATE.MODEL] = undefined;

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
