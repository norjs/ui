import LogUtils from "@norjs/utils/Log";
import NrMessage from "../../models/views/NrMessage";
import NrAttribute from "../NrAttribute";

const nrLog = LogUtils.getLogger(`NrMessageController`);

export class NrMessageController {

	static getBindings () {
		return {
			model: `<?${NrAttribute.MODEL}`
		};
	}

	/**
	 *
	 * @ngInject
	 */
	constructor () {

		/**
		 *
		 * @member {NrMessage}
		 * @private
		 */
		this._model = undefined;

	}

	$onInit () {

		nrLog.debug(`Initial model is: `, this._model);

	}

	/**
	 *
	 * @returns {NrMessage|undefined}
	 */
	get model () {

		return this._model;

	}

	/**
	 *
	 * @param value {NrMessage|undefined}
	 */
	set model (value) {

		if (value !== this._model) {
			this._setModel(value);
		}

	}

	/**
	 *
	 * @returns {string|undefined}
	 */
	get label () {
		return this.model ? this.model.label : undefined;
	}

	/**
	 *
	 * @returns {boolean}
	 */
	hasModel () {
		return this._model ? this._model instanceof NrMessage : false;
	}

	/**
	 *
	 * @returns {boolean}
	 */
	hasIcon () {
		return !!(this._model && this._model.icon)
	}

	/**
	 *
	 * @returns {NrIconValue|string|undefined}
	 */
	getIconValue () {
		return this._model && this._model.icon ? this._model.icon.value : undefined;
	}

	/**
	 *
	 * @param payload {NrMessage}
	 * @private
	 */
	_setModel (payload) {

		this._model = payload;

		nrLog.debug(`Model set as: `, this._model);

	}

}

// noinspection JSUnusedGlobalSymbols
export default NrMessageController;
