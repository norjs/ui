import NrTextInputController from '../nrTextInput/NrTextInputController.js';
import NrTag from "../../NrTag";
import LogUtils from "@norjs/utils/Log";

// noinspection JSUnusedLocalSymbols
const nrLog = LogUtils.getLogger(NrTag.TEXTAREA);

// noinspection JSUnusedLocalSymbols
/**
 *
 * @enum {Symbol}
 * @readonly
 */
const PRIVATE = {
	$element: Symbol('_$element')
};

/**
 *
 * FIXME: Implement support for ng-touched
 *
 * @ngInject
 */
export class NrTextareaController extends NrTextInputController {

	/**
	 *
	 * @returns {typeof NrTextareaController}
	 */
	get Class () {
		return NrTextareaController;
	}

	/**
	 *
	 * @returns {NrTag|string}
	 */
	static get nrName () {
		return NrTag.TEXTAREA;
	}

	/**
	 *
	 * @returns {NrTag|string}
	 */
	get nrName () {
		return super.nrName;
	}

	/**
	 *
	 * @returns {Object.<string, string>}
	 */
	static getComponentBindings () {
		return super.getComponentBindings();
	}

	/**
	 *
	 * @returns {Object.<string, string>}
	 */
	static getComponentRequire () {
		return super.getComponentRequire();
	}

	/**
	 *
	 * @param template {string}
	 * @returns {angular.IComponentOptions}
	 */
	static getComponentConfig (template) {
		return super.getComponentConfig(template);
	}

	static get $inject () {
		if (this._inject) return this._inject;
		return ["$attrs", "$element"];
	}
	static set $inject (value) {
		this._inject = value;
	}

	// noinspection DuplicatedCode
	/**
	 *
	 * @param $attrs {angular.IAttributes}
	 * @param $element {JQLite}
	 * @ngInject
	 */
	constructor (
		$attrs
		, $element
	) {

		super($attrs, $element);

		/**
		 *
		 * @member {JQLite}
		 * @private
		 */
		this[PRIVATE.$element] = $element;

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
	 * Get internal input element's model value.
	 *
	 * This is used from the template by AngularJS two way binding.
	 *
	 * @returns {string}
	 */
	get bindModelValue () {

		return super.bindModelValue;

	}

	/**
	 * Sets internal input element's model value.
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
	 * @param $event
	 */
	onLabelClick ($event) {

		this[PRIVATE.$element][0].querySelector('textarea').focus();

	}

	/**
	 * Template uses this
	 * @returns {string}
	 */
	getPlaceholder () {
		return super.getPlaceholder();
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
export default NrTextareaController;
