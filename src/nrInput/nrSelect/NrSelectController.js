import _ from 'lodash';
import NrInputController from '../NrInputController.js';
import LogUtils from "@norjs/utils/Log";
import NrAttribute from "../../NrAttribute";
import NrTag from "../../NrTag";
import NgAttribute from "../../NgAttribute";
import NrStyleClass from "../../NrStyleClass";
import NrTextInputController from "../nrTextInput/NrTextInputController";

// noinspection JSUnusedLocalSymbols
const nrLog = LogUtils.getLogger(NrTag.SELECT);

/**
 *
 * @enum {Symbol}
 * @readonly
 */
const PRIVATE = {
	$element: Symbol('_$element')
	, list: Symbol('_list')
};

/**
 *
 * FIXME: Implement support for ng-touched
 *
 * @ngInject
 */
export class NrSelectController extends NrTextInputController {

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
			bindNrType: `@?${NrAttribute.TYPE}` // FIXME: This is not used?
			, bindNrId: `@?${NrAttribute.ID}` // FIXME: This is not used?
			, bindNrName: `@?${NrAttribute.NAME}`
			, bindNrModel: `<?${NrAttribute.MODEL}`
			, bindNrLabel: `@?${NrAttribute.LABEL}`
			, __getList: `&?${NrAttribute.SELECT_GET_LIST}`
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
			bindNrFormController: `?^^${NrTag.FORM}`
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

	static get $inject () {
		return ["$attrs", "$element"];
	}

	// noinspection DuplicatedCode
	/**
	 *
	 * @param $attrs {angular.IAttributes}
	 * @param $element {JQLite}
	 * @ngInject
	 */
	constructor ($attrs, $element) {

		super($attrs, $element);

		/**
		 *
		 * @member {JQLite}
		 * @private
		 */
		this[PRIVATE.$element] = $element;

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
		this[PRIVATE.bindModelValue] = undefined;

		/**
		 * If `true`, this controller has focus.
		 *
		 * @type {boolean}
		 */
		this[PRIVATE.focus] = false;

	}

	$onDestroy () {

		super.$onDestroy();

	}

	/**
	 *
	 * @returns {boolean|undefined}
	 */
	useLabel () {

		return super.useLabel();

	}

	/**
	 * Returns label text for this element.
	 *
	 * @returns {string}
	 */
	getLabel () {

		return super.getLabel();

	}

	/**
	 *
	 * @returns {boolean}
	 */
	hasIconValue () {

		return super.hasIconValue();

	}

	/**
	 *
	 * @returns {NrIconValue|string|undefined}
	 */
	getIconValue () {

		return super.getIconValue();

	}

	/**
	 *
	 * @returns {string|undefined}
	 */
	getName () {

		return super.getName();

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * Handles ngModel controller setter for AngularJS required feature.
	 *
	 * @param controller {ngModel.ngModelController}
	 */
	setNgModelController (controller) {

		super.setNgModelController(controller);

	}

	/**
	 * Returns true if we already have AngularJS angular.INgModelController registered to this component.
	 *
	 * *Note!* This is ***NOT*** the ng-model controller of the child nrInput element which is in the template.
	 *
	 * @returns {boolean}
	 */
	hasNgModelController () {

		return super.hasNgModelController();

	}

	/**
	 * Returns AngularJS angular.INgModelController of this component, if one exists.
	 *
	 * *Note!* This is ***NOT*** the ng-model controller of the child nrInput element in the template.
	 *
	 * @returns {angular.INgModelController|undefined}
	 */
	getNgModelController () {

		return super.getNgModelController();

	}

	/**
	 * Returns the view value.
	 *
	 * @returns {string|undefined}
	 */
	getViewValue () {

		return super.getViewValue();

	}

	/**
	 * Sets the view value.
	 *
	 * @param value {string}
	 * @param trigger {string} Event that triggered the update.
	 */
	setViewValue (value, trigger) {

		super.setViewValue(value, trigger);

	}

	/**
	 * This callback is called from ngModel.ngModelController's $render implementation.
	 *
	 * See more at setter for ngModelController.
	 */
	onNgModelRender () {

		super.onNgModelRender();

	}

	/**
	 * Called from the template when inner nrInput element changes model value, eg. our inner view value.
	 */
	onChange () {

		super.onChange();

	}

	/**
	 * Get internal nrInput element's model value; eg. it is our view value.
	 *
	 * This is used from the template by AngularJS two way binding.
	 *
	 * @returns {string}
	 */
	get bindModelValue () {

		return super.bindModelValue;

	}

	/**
	 * Sets internal nrInput element's model value; eg. it is our view value.
	 *
	 * This is used from the template by AngularJS two way binding.
	 *
	 * @param value {string}
	 */
	set bindModelValue (value) {

		super.bindModelValue = value;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * Returns `true` if this element has focus.
	 *
	 * @returns {boolean}
	 */
	hasFocus () {

		return super.hasFocus;

	}

	/**
	 *
	 * @param $event
	 */
	onFocus ($event) {

		super.onFocus();

	}

	/**
	 *
	 * @param $event
	 */
	onBlur ($event) {

		super.onBlur();

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {string|undefined}
	 */
	get bindNrType () {

		return super.bindNrType;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set bindNrType (value) {

		super.bindNrType = value;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {string|undefined}
	 */
	get bindNrId () {

		return super.bindNrId;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set bindNrId (value) {

		super.bindNrId = value;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {string|undefined}
	 */
	get bindNrName () {

		return super.bindNrName;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set bindNrName (value) {

		super.bindNrName = value;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {NrTextField|undefined}
	 */
	get bindNrModel () {

		return super.bindNrModel;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {NrTextField|undefined}
	 */
	set bindNrModel (value) {

		super.bindNrModel = value;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {string|undefined}
	 */
	get bindNrLabel () {

		return super.bindNrLabel;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set bindNrLabel (value) {

		super.bindNrLabel = value;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {string|undefined}
	 */
	get bindNgModel () {

		return super.bindNgModel;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set bindNgModel (value) {

		super.bindNgModel = value;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {NrFormController|undefined}
	 */
	get bindNrFormController () {

		return super.bindNrFormController;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {NrFormController|undefined}
	 */
	set bindNrFormController (value) {

		super.bindNrFormController = value;

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
	 *
	 * @param $event
	 */
	onLabelClick ($event) {

		this[PRIVATE.$element][0].querySelector('select').focus();

	}

	getFieldStyles () {

		return super.getFieldStyles();

	}

	/**
	 *
	 * @returns {boolean}
	 */
	isReadOnly () {

		return super.isReadOnly();

	}

}

// noinspection JSUnusedGlobalSymbols
export default NrSelectController;
