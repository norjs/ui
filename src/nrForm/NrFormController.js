import _ from 'lodash';
import LogUtils from "@norjs/utils/Log";

// noinspection JSUnusedLocalSymbols
const nrLog = LogUtils.getLogger('nrFormController');

/**
 *
 * @enum {Symbol}
 * @readonly
 */
const PRIVATE = {
	model: Symbol('_model')
	, submitAction: Symbol('_submitAction')
	, cancelAction: Symbol('_cancelAction')
};

export class NrFormController {

	static getBindings () {
		return {
			model: "<nrModel"
			, submitAction: "&?nrSubmit"
			, cancelAction: "&?nrCancel"
		};
	}

	/**
	 * @param nrModelComponentService {NrModelComponentService}
	 * @ngInject
	 */
	constructor (nrModelComponentService) {

		/**
		 *
		 * @member {NrModelComponentService}
		 * @private
		 */
		this._nrModelComponentService = nrModelComponentService;

		/**
		 *
		 * @member {NrForm | undefined}
		 */
		this[PRIVATE.model] = undefined;

		/**
		 *
		 * @member {Function|undefined}
		 */
		this[PRIVATE.submitAction] = undefined;

		/**
		 *
		 * @member {Function|undefined}
		 */
		this[PRIVATE.cancelAction] = undefined;

	}

	$onDestroy () {

		this[PRIVATE.model] = undefined;
		this[PRIVATE.submitAction] = undefined;
		this[PRIVATE.cancelAction] = undefined;

	}

	/**
	 *
	 * @param value {NrForm | undefined}
	 */
	set model (value) {

		if (this[PRIVATE.model] !== value) {

			this[PRIVATE.model] = value;

			nrLog.trace(`Model changed as: `, value);

		}

	}

	/**
	 *
	 * @returns {NrForm|undefined}
	 */
	get model () {

		return this[PRIVATE.model];

	}

	getItems () {
		return this[PRIVATE.model].content;
	}

	getItemId (item) {

		if (item.id) return `id-${item.id}`;

		if (item.name) return `name-${item.name}`;

		return item;

	}

	/**
	 *
	 * @param item {NrModel}
	 * @returns {{component: string, resolve: Object}}
	 */
	getItemCompileConfig (item) {

		return this._nrModelComponentService.getComponentConfig(item);

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS binding uses this.
	 *
	 * @param value {Function | undefined}
	 */
	set submitAction (value) {

		this[PRIVATE.submitAction] = value;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS binding uses this.
	 *
	 * @returns {Function|undefined}
	 */
	get submitAction () {

		return this[PRIVATE.submitAction];

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS binding uses this.
	 *
	 * @param value {Function | undefined}
	 */
	set cancelAction (value) {

		this[PRIVATE.cancelAction] = value;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS binding uses this.
	 *
	 * @returns {Function|undefined}
	 */
	get cancelAction () {

		return this[PRIVATE.cancelAction];

	}

	/**
	 *
	 * @returns {boolean}
	 */
	hasCancelAction () {
		return _.isFunction(this[PRIVATE.cancelAction]);
	}

	/**
	 *
	 * @returns {boolean}
	 */
	isSubmitEnabled () {
		return _.isFunction(this[PRIVATE.submitAction]);
	}

	/**
	 *
	 */
	submit () {

		if (_.isFunction(this[PRIVATE.submitAction])) {

			nrLog.trace(`Submit clicked`);

			this[PRIVATE.submitAction]({
				nrModel: this[PRIVATE.model]
			});

		} else {

			nrLog.warn(`No submit callback.`);

		}

	}

	/**
	 *
	 */
	cancel () {

		nrLog.trace(`Cancel clicked`);

		if (_.isFunction(this[PRIVATE.cancelAction])) {

			this[PRIVATE.cancelAction]({
				nrModel  : this[PRIVATE.model]
			});

		} else {

			nrLog.warn(`No cancel callback.`);

		}

	}

}
