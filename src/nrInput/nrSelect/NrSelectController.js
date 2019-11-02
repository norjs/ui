import _ from 'lodash';
import NrInputController from '../NrInputController.js';
import LogUtils from "@norjs/utils/Log";
import NrAttribute from "../../NrAttribute";
import NrTag from "../../NrTag";
import NgAttribute from "../../NgAttribute";
import NrStyleClass from "../../NrStyleClass";

// noinspection JSUnusedLocalSymbols
const nrLog = LogUtils.getLogger(NrTag.PASSWORD_INPUT);

/**
 *
 * @enum {Symbol}
 * @readonly
 */
const PRIVATE = {
	useLabel: Symbol('useLabel'),
	ngModelController: Symbol('ngModelController'),
	ngModel: Symbol('ngModel'),
	innerViewValue: Symbol('innerViewValue'),
	focus: Symbol('focus')
};

/**
 *
 * FIXME: Implement support for ng-touched
 *
 * @ngInject
 */
export class NrSelectController extends NrInputController {

	/**
	 *
	 * @returns {typeof NrSelectController}
	 */
	get Class () {
		return NrSelectController;
	}

	/**
	 *
	 * @returns {NrTag|string}
	 */
	static get nrName () {
		return NrTag.SELECT;
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
	 * @returns {Object.<string, string>}
	 */
	static getComponentBindings () {
		return {
			__type: `@?${NrAttribute.TYPE}`
			, __id: `@?${NrAttribute.ID}`
			, __name: `@?${NrAttribute.NAME}`
			, __label: `@?${NrAttribute.LABEL}`
			, __ngModel: `=?${NgAttribute.MODEL}`
			, __getList: `&?${NrAttribute.SELECT_GET_LIST}`
			, __getItemId: `&?${NrAttribute.SELECT_GET_ITEM_ID}`
			, __getItemValue: `&?${NrAttribute.SELECT_GET_ITEM_VALUE}`
			, __getItemLabel: `&?${NrAttribute.SELECT_GET_ITEM_LABEL}`
		};
	}

	/**
	 *
	 * @returns {Object.<string, string>}
	 */
	static getComponentRequire () {
		return {
			__nrForm: `?^^${NrTag.FORM}`
			, __ngModelController: `?^${NgAttribute.MODEL}`
		};
	}

	/**
	 *
	 * @param template {string}
	 * @returns {angular.IComponentOptions}
	 */
	static getComponentConfig (template) {
		// noinspection JSValidateTypes
		return {
			template
			, bindings: this.getComponentBindings()
			, require: this.getComponentRequire()
			, controller: this
		};
	}

	// noinspection DuplicatedCode
	/**
	 *
	 * @param $attrs {angular.IAttributes}
	 * @param $element {JQLite}
	 * @ngInject
	 */
	constructor ($attrs, $element) {

		super();

		/**
		 *
		 * @member {JQLite}
		 * @private
		 */
		this.$element = $element;

		/**
		 *
		 * @member {string|undefined}
		 * @private
		 */
		this.__type = undefined;

		/**
		 *
		 * @member {string|undefined}
		 * @private
		 */
		this.__id = undefined;

		// noinspection JSUnusedGlobalSymbols
		/**
		 *
		 * @member {string|undefined}
		 * @private
		 */
		this.__name = undefined;

		/**
		 *
		 * @member {string|undefined}
		 * @private
		 */
		this.__label = undefined;

		/**
		 *
		 * @member {Function|function|undefined}
		 * @private
		 */
		this.__getList = undefined;

		/**
		 *
		 * @member {Function|function|undefined}
		 * @private
		 */
		this.__getItemId = undefined;

		/**
		 *
		 * @member {Function|function|undefined}
		 * @private
		 */
		this.__getItemValue = undefined;

		/**
		 *
		 * @member {Function|function|undefined}
		 * @private
		 */
		this.__getItemLabel = undefined;

		// noinspection JSUnusedGlobalSymbols
		/**
		 * The AngularJS's form controller
		 *
		 * @member {angular.IFormController|undefined}
		 * @private
		 */
		this.__nrForm = undefined;

		/**
		 * The state for our .useLabel() implementation.
		 *
		 * @type {boolean}
		 */
		this[PRIVATE.useLabel] = !!_.has($attrs, NrAttribute.LABEL);

		/**
		 * The ng-model controller.
		 *
		 * @type {angular.INgModelController}
		 */
		this[PRIVATE.ngModelController] = undefined;

		/**
		 *
		 * @type {string}
		 */
		this[PRIVATE.ngModel] = undefined;

		/**
		 *
		 * @type {string}
		 */
		this[PRIVATE.innerViewValue] = undefined;

		/**
		 * If `true`, this controller has focus.
		 *
		 * @type {boolean}
		 */
		this[PRIVATE.focus] = false;

	}

	/**
	 *
	 * @returns {boolean}
	 */
	useLabel () {
		return this[PRIVATE.useLabel];
	}

	/**
	 * Returns label text for this element.
	 *
	 * @returns {string}
	 */
	getLabel () {
		return this.__label;
	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * Handles ngModel controller getter for AngularJS required feature.
	 *
	 * @returns {ngModel.ngModelController}
	 * @private
	 */
	get __ngModelController () {
		return this[PRIVATE.ngModelController];
	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * Handles ngModel controller setter for AngularJS required feature.
	 *
	 * @param controller {ngModel.ngModelController}
	 * @private
	 */
	set __ngModelController (controller) {
		if (controller) {

			this[PRIVATE.ngModelController] = controller;

			this[PRIVATE.ngModelController].$render = () => this.onNgModelRender();

		} else if (this[PRIVATE.ngModelController]) {
			this[PRIVATE.ngModelController] = undefined;
		}
	}

	/**
	 * Returns true if we already have AngularJS angular.INgModelController registered to this component.
	 *
	 * *Note!* This is ***NOT*** the ng-model controller of the child nrInput element which is in the template.
	 *
	 * @returns {boolean}
	 */
	hasNgModelController () {
		return !!this[PRIVATE.ngModelController];
	}

	/**
	 * Returns AngularJS angular.INgModelController of this component, if one exists.
	 *
	 * *Note!* This is ***NOT*** the ng-model controller of the child nrInput element in the template.
	 *
	 * @returns {angular.INgModelController|undefined}
	 */
	getNgModelController () {
		return this[PRIVATE.ngModelController];
	}


	/**
	 * Returns the view value.
	 *
	 * @returns {string|undefined}
	 */
	getViewValue () {
		return this.hasNgModelController() ? this.getNgModelController().$viewValue : undefined;
	}

	/**
	 * Sets the view value.
	 *
	 * @param value {string}
	 * @param trigger {string} Event that triggered the update.
	 */
	setViewValue (value, trigger) {
		const ngModelController = this.getNgModelController();
		ngModelController.$setViewValue(value, trigger);
		ngModelController.$setDirty();
	}


	/**
	 * This callback is called from ngModel.ngModelController's $render implementation.
	 *
	 * See more at setter for __ngModelController.
	 */
	onNgModelRender () {
		this.innerViewValue = this.getViewValue();
	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * This is the getter for component attribute binding of the ng-model attribute given to this component.
	 *
	 * AngularJS will call this method from ngModel controller.
	 *
	 * @returns {string}
	 */
	get __ngModel () {
		return this._getModelValue();
	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * This is the setter for component attribute binding of the ng-model attribute given to this component.
	 *
	 * AngularJS will call this method from ngModel controller.
	 *
	 * @param value {string}
	 * @private
	 */
	set __ngModel (value) {
		this._setModelValue(value);
	}

	/**
	 *
	 * @returns {string} Date as a string in format YYYY-MM-DD
	 * @private
	 */
	_getModelValue () {
		return this[PRIVATE.ngModel];
	}

	/**
	 *
	 * @param value {string} Date as a string in format YYYY-MM-DD
	 * @private
	 */
	_setModelValue (value) {

		this[PRIVATE.ngModel] = value;

	}

	/**
	 * Called from the template when inner nrInput element changes model value, eg. our inner view value.
	 */
	onChange () {
		this.setViewValue(this.innerViewValue, undefined);
	}

	/**
	 * Get internal nrInput element's model value; eg. it is our view value.
	 *
	 * This is used from the template by AngularJS two way binding.
	 *
	 * @returns {string}
	 */
	get innerViewValue () {
		return this[PRIVATE.ngModel];
	}

	/**
	 * Sets internal nrInput element's model value; eg. it is our view value.
	 *
	 * This is used from the template by AngularJS two way binding.
	 *
	 * @param value {string}
	 */
	set innerViewValue (value) {
		this[PRIVATE.ngModel] = value;
	}


	/**
	 *
	 * @returns {Array.<*>}
	 */
	getList () {
		if (_.isFunction(this.__getList)) {
			return this.__getList({nrSelect: this});
		}
		return [];
	}

	/**
	 *
	 * @param item
	 * @returns {*}
	 */
	getItemId (item) {
		if (_.isFunction(this.__getItemId)) {
			return this.__getItemId({nrSelect: this, item});
		}
		if (_.isFunction(this.__getItemValue)) {
			return this.__getItemValue({nrSelect: this, item});
		}
		return item;
	}

	/**
	 *
	 * @param item
	 * @returns {*}
	 */
	getItemValue (item) {
		if (_.isFunction(this.__getItemValue)) {
			return this.__getItemValue({nrSelect: this, item});
		}
		return item;
	}

	/**
	 *
	 * @param item
	 * @returns {*}
	 */
	getItemLabel (item) {
		if (_.isFunction(this.__getItemLabel)) {
			return this.__getItemLabel({nrSelect: this, item});
		}
		return this.getItemId(item);
	}

	/**
	 *
	 * @param item {*}
	 * @returns {boolean}
	 */
	isItemSelected (item) {
		const modelValue = this._getModelValue();
		return !!(modelValue && this.getItemValue(item) === modelValue);
	}

	/**
	 * Returns `true` if this element has focus.
	 *
	 * @returns {boolean}
	 */
	hasFocus () {
		return this[PRIVATE.focus];
	}

	/**
	 *
	 * @param $event
	 */
	onFocus ($event) {
		this[PRIVATE.focus] = true;
		this._updateFocusStyles();
	}

	/**
	 *
	 * @param $event
	 */
	onBlur ($event) {
		this[PRIVATE.focus] = false;
		this._updateFocusStyles();
	}

	/**
	 *
	 * @private
	 */
	_updateFocusStyles () {

		this.Class.toggleClass(this.$element, NrStyleClass.FOCUS, this[PRIVATE.focus]);

	}

}

// noinspection JSUnusedGlobalSymbols
export default NrSelectController;
