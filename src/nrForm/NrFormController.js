import _ from 'lodash';
import LogUtils from "@norjs/utils/Log";
import NrInputController from "../nrInput/NrInputController";
import NrTag from "../NrTag";
import NrModelUtils from "../../utils/NrModelUtils";
import NrEventName from "../../models/NrEventName";
import NrIcon from '../../models/NrIcon';

// noinspection JSUnusedLocalSymbols
const nrLog = LogUtils.getLogger('nrFormController');

/**
 *
 * @enum {Symbol}
 * @readonly
 */
const PRIVATE = {
	nrModel                   : Symbol('_nrModel')
	, submitAction            : Symbol('_submitAction')
	, cancelAction            : Symbol('_cancelAction')
	, isCancelVisible         : Symbol('_isCancelVisible')
	, items                   : Symbol('_items')
	, ngFormController        : Symbol('_ngForm')
	, fieldControllers        : Symbol('_fieldControllers')
	, $scope                  : Symbol('_$scope')
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

	/**
	 *
	 * @returns {NrTag|string}
	 */
	static get nrName () {
		return NrTag.FORM;
	}

	/**
	 *
	 * @returns {NrTag|string}
	 */
	get nrName () {
		return this.Class.nrName;
	}

	/**
	 *
	 * @returns {typeof NrFormController}
	 */
	get Class () {
		return NrFormController;
	}

	/**
	 *
	 * @returns {{bindNrModel: string, bindCancelAction: string, bindSubmitAction: string}}
	 */
	static getBindings () {
		return {
			bindNrModel: "<nrModel"
			, bindSubmitAction: "&?nrSubmit"
			, bindCancelAction: "&?nrCancel"
			, bindCancelVisible: "&?nrCancelVisible"
		};
	}

	/**
	 * @param $scope {angular.IScope}
	 * @ngInject
	 */
	constructor ($scope) {
		'ngInject';

		/**
		 *
		 * @member {angular.IScope}
		 * @private
		 */
		this[PRIVATE.$scope] = $scope;

		/**
		 *
		 * @member {NrForm | undefined}
		 */
		this[PRIVATE.nrModel] = undefined;

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
		 * @member {Array<NrInputController>}
		 */
		this[PRIVATE.fieldControllers] = [];

		/**
		 *
		 * @member {angular.IFormController|undefined}
		 * @private
		 */
		this[PRIVATE.ngFormController] = undefined;

	}

	// noinspection JSUnusedGlobalSymbols,DuplicatedCode
	$onDestroy () {

		this[PRIVATE.nrModel] = undefined;
		this[PRIVATE.submitAction] = undefined;
		this[PRIVATE.cancelAction] = undefined;
		this[PRIVATE.items] = undefined;
		this[PRIVATE.fieldControllers] = undefined;
		this[PRIVATE.ngFormController] = undefined;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS binds to this through bindings.
	 *
	 * @param value {NrForm | undefined}
	 */
	set bindNrModel (value) {

		if (this[PRIVATE.nrModel] !== value) {

			this[PRIVATE.nrModel] = value;

			nrLog.trace(`Model changed as: `, value);

			this._updateItems();

		}

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS binds to this through bindings.
	 *
	 * @returns {NrForm|undefined}
	 */
	get bindNrModel () {

		return this[PRIVATE.nrModel];

	}

	/**
	 *
	 * @returns {NrForm}
	 */
	get nrModel () {
		return this[PRIVATE.nrModel];
	}

	/**
	 *
	 * @returns {boolean}
	 */
	hasIconValue () {

		return !!(this[PRIVATE.nrModel] && this[PRIVATE.nrModel].icon && this[PRIVATE.nrModel].icon.value);

	}

	/**
	 *
	 * @returns {NrIconValue|string|undefined}
	 */
	getIconValue () {

		return this[PRIVATE.nrModel] && this[PRIVATE.nrModel].icon ? this[PRIVATE.nrModel].icon.value : undefined;

	}

	/**
	 *
	 * @returns {string|undefined}
	 */
	getLabel () {
		return this[PRIVATE.nrModel] ? this[PRIVATE.nrModel].label : undefined;
	}

	/**
	 *
	 * @returns {Array.<NrFormItemObject>}
	 */
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

	// noinspection JSUnusedGlobalSymbols
	/**
	 *
	 * @param item {NrFormItemObject}
	 * @returns {NrModel}
	 * @private
	 */
	getItemModel (item) {

		return item.model;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * Called from the template
	 *
	 * @param item {NrFormItemObject}
	 * @returns {NrComponentConfigObject}
	 */
	getItemCompileConfig (item) {

		return item.config;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS binding uses this.
	 *
	 * @param value {Function | undefined}
	 */
	set bindSubmitAction (value) {

		this[PRIVATE.submitAction] = value;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS binding uses this.
	 *
	 * @returns {Function|undefined}
	 */
	get bindSubmitAction () {

		return this[PRIVATE.submitAction];

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS binding uses this.
	 *
	 * @param value {Function | undefined}
	 */
	set bindCancelAction (value) {

		this[PRIVATE.cancelAction] = value;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS binding uses this.
	 *
	 * @returns {Function|undefined}
	 */
	get bindCancelAction () {

		return this[PRIVATE.cancelAction];

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS binding uses this.
	 *
	 * @param value {Function | undefined}
	 */
	set bindCancelVisible (value) {

		this[PRIVATE.isCancelVisible] = value;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS binding uses this.
	 *
	 * @returns {Function|undefined}
	 */
	get bindCancelVisible () {

		return this[PRIVATE.isCancelVisible];

	}

	/**
	 *
	 * @returns {boolean}
	 */
	hasCancelAction () {

		if (_.isFunction(this[PRIVATE.isCancelVisible])) {
			return this[PRIVATE.isCancelVisible]({nrFormController: this});
		}

		if (_.isFunction(this[PRIVATE.cancelAction])) {
			return true;
		}

		return !!( this.nrModel && this.nrModel.cancel );

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * Called from the template
	 *
	 * @returns {boolean}
	 */
	isSubmitEnabled () {

		return true;

	}

	/**
	 *
	 */
	submit () {

		if ( this[PRIVATE.submitAction] !== undefined ) {

			if (_.isFunction(this[PRIVATE.submitAction])) {

				const payload = this.getModifiedPayload();

				nrLog.trace(`.submit(): submit action with payload: `, payload);

				this[PRIVATE.submitAction]({
					nrFormController: this,
					nrModel: this[PRIVATE.nrModel]
					, payload
				});

			} else {

				throw new TypeError(`${nrLog.name}.submit(): submit action with non-function callback: ${LogUtils.getAsString(this[PRIVATE.submitAction])}`);

			}

		} else {

			const payload = this.getModifiedPayload();

			this[PRIVATE.$scope].$emit(NrEventName.FORM_SUBMIT, payload, this);

			nrLog.trace(`.onClick(): No submit action configured; emitted an event FORM_SUBMIT "${NrEventName.FORM_SUBMIT}"`);

		}

	}

	/**
	 *
	 */
	cancel () {

		nrLog.trace(`Cancel clicked`);

		if (_.isFunction(this[PRIVATE.cancelAction])) {

			this[PRIVATE.cancelAction]({
				nrModel : this[PRIVATE.nrModel]
				, payload: this.getModifiedPayload()
			});

		} else {

			const payload = this.getModifiedPayload();

			this[PRIVATE.$scope].$emit(NrEventName.FORM_CANCEL, payload, this);

			nrLog.trace(`.onClick(): No cancel action configured; emitted an event FORM_CANCEL "${NrEventName.FORM_CANCEL}"`);

		}

	}

	getSubmitIcon () {
		return this[PRIVATE.nrModel].submitButton ? this[PRIVATE.nrModel].submitButton.icon : NrIcon.Value.CHECK;
	}

	getSubmitLabel () {
		return this[PRIVATE.nrModel].submitButton ? this[PRIVATE.nrModel].submitButton.label : "nrForm.submit.label";
	}

	getCancelIcon () {
		return this[PRIVATE.nrModel].cancelButton ? this[PRIVATE.nrModel].cancelButton.icon : NrIcon.Value.BAN;
	}

	getCancelLabel () {
		return this[PRIVATE.nrModel].cancelButton ? this[PRIVATE.nrModel].cancelButton.label : "nrForm.cancel.label";
	}

	/**
	 * AngularJS calls this from template (see `<form name="$ctrl.bindNgFormController">`).
	 *
	 * @returns {angular.IFormController|undefined}
	 */
	get bindNgFormController () {
		return this[PRIVATE.ngFormController];
	}

	/**
	 * AngularJS calls this from template (see `<form name="$ctrl.bindNgFormController">`).
	 *
	 * @param value {angular.IFormController}
	 */
	set bindNgFormController (value) {

		if (value !== this[PRIVATE.ngFormController]) {

			this[PRIVATE.ngFormController] = value;

			nrLog.trace(`AngularJS FormController registered as: `, value);

		}

	}

	/**
	 *
	 * @param fieldController {NrInputController}
	 */
	hasFieldController (fieldController) {

		return _.some(this[PRIVATE.fieldControllers], c => c === fieldController);

	}

	/**
	 *
	 * @param fieldController {NrInputController}
	 */
	registerFieldController (fieldController) {

		if (fieldController instanceof NrInputController) {

			if (this.hasFieldController(fieldController)) {
				throw new TypeError(`${nrLog.name}.registerFieldController(): Field controller already registered: ${fieldController}`);
			}

			this[PRIVATE.fieldControllers].push(fieldController);

			nrLog.trace(`.unregisterFieldController(): Registered field controller "${fieldController}"`)

		} else {

			nrLog.warn(`.registerFieldController(): Not a field controller: `, fieldController);

		}

	}

	/**
	 *
	 * @param fieldController {NrInputController}
	 */
	unregisterFieldController (fieldController) {

		if (fieldController instanceof NrInputController) {

			_.remove(this[PRIVATE.fieldControllers], c => c === fieldController);

			nrLog.trace(`.unregisterFieldController(): Unregistered field controller "${fieldController}"`)

		} else {

			nrLog.warn(`.unregisterFieldController(): Not a field controller: `, fieldController);

		}

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 *
	 * @returns {Object}
	 */
	getOriginalPayload () {

		return this[PRIVATE.nrModel].payload;

	}

	/**
	 * Returns an object with original payload and changes merged as one.
	 *
	 * @param payload {Object}
	 * @returns {Object}
	 */
	getModifiedPayload (payload= {}) {

		const originalPayload = this[PRIVATE.nrModel].payload || {};

		const modifiedValues = this._getFieldValues();

		return _.merge({}, originalPayload, payload, modifiedValues);

	}

	/**
	 *
	 * @private
	 */
	_updateItems() {

		this[PRIVATE.items] = _.map(
			this[PRIVATE.nrModel].content,
			item => {

				const config = NrModelUtils.getComponentConfig(item);

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

	/**
	 *
	 * @returns {Object}
	 * @private
	 */
	_getFieldValues (item) {

		const values = {};

		_.each(

			this[PRIVATE.fieldControllers],

			/**
			 *
			 * @param fieldController {NrInputController}
			 */
			fieldController => {

				const name = fieldController.getName();

				if (!name) return;

				const value = fieldController.getModelValue();

				nrLog.trace(`_getFieldValues(): "${name}": `, value);
				nrLog.trace(`_getFieldValues(): fieldController.ngModel: `, fieldController.getNgModelController());

				if (_.has(values, name)) {

					const prop = _.get(values, name);

					if (_.isArray(prop)) {
						prop.push(value);
					} else {
						_.set(values, name, [prop, value]);
					}

				} else {

					_.set(values, name, value);

				}

			}

		);

		return values;

	}

}
