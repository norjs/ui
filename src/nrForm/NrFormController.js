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
	, items: Symbol('_items')
	, updateItems: Symbol('_updateItems')
	, ngForm: Symbol('_ngForm')
};

/**
 * @typedef {Object} NrComponentConfigObject
 * @property {string} component - The component name
 * @property {Object} resolve - Resolve values
 */

/**
 * @typedef {Object} NrFormItemObject
 * @property {string} id - Unique item id
 * @property {NrModel} model - The model object
 * @property {NrComponentConfigObject} config - The nr-component configuration object
 */

/**
 *
 */
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

		/**
		 *
		 * @member {Array.<NrFormItemObject>}
		 */
		this[PRIVATE.items] = [];

		/**
		 *
		 * @member {angular.IFormController|undefined}
		 * @private
		 */
		this[PRIVATE.ngForm] = undefined;

	}

	$onDestroy () {

		this[PRIVATE.model] = undefined;
		this[PRIVATE.submitAction] = undefined;
		this[PRIVATE.cancelAction] = undefined;
		this[PRIVATE.items] = undefined;

	}

	/**
	 *
	 * @param value {NrForm | undefined}
	 */
	set model (value) {

		if (this[PRIVATE.model] !== value) {

			this[PRIVATE.model] = value;

			nrLog.trace(`Model changed as: `, value);

			this[PRIVATE.updateItems]();

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
		return this[PRIVATE.items];
	}

	/**
	 *
	 * @param item {NrFormItemObject}
	 * @returns {string}
	 * @private
	 */
	getItemId (item) {
		return item.id;
	}

	/**
	 *
	 * @param item {NrFormItemObject}
	 * @returns {NrModel}
	 * @private
	 */
	getItemModel (item) {
		return item.model;
	}

	/**
	 *
	 * @param item {NrFormItemObject}
	 * @returns {NrComponentConfigObject}
	 */
	getItemCompileConfig (item) {

		return item.config;

	}

	/**
	 *
	 */
	[PRIVATE.updateItems]() {

		this[PRIVATE.items] = _.map(this[PRIVATE.model].content, item => {

			const config = this._nrModelComponentService.getComponentConfig(item);

			return {
				id: this._getItemId(item)
				, model: item
				, config
			};

		});

		nrLog.trace(`Internal items array updated: `, this[PRIVATE.items]);

	}

	/**
	 *
	 * @param item {NrModel}
	 * @private
	 */
	_getItemId (item) {

		// FIXME: We need an interface for unique id in NrModel
		return item.id || item.name;

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

	/**
	 *
	 * @returns {angular.IFormController|undefined}
	 */
	get ngForm () {
		return this[PRIVATE.ngForm];
	}

	/**
	 *
	 * @param value {angular.IFormController}
	 */
	set ngForm (value) {

		if (value !== this[PRIVATE.ngForm]) {

			this[PRIVATE.ngForm] = value;

			nrLog.trace(`AngularJS FormController registered as: `, value);

		}

	}

}
