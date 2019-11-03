import NrTextInputController from '../nrTextInput/NrTextInputController.js';
import NrTag from "../../NrTag";
import LogUtils from "@norjs/utils/Log";

// noinspection JSUnusedLocalSymbols
const nrLog = LogUtils.getLogger(NrTag.PASSWORD_INPUT);

// noinspection JSUnusedLocalSymbols
/**
 *
 * @enum {Symbol}
 * @readonly
 */
const PRIVATE = {
};

/**
 *
 * FIXME: Implement support for ng-touched
 *
 * @ngInject
 */
export class NrPasswordInputController extends NrTextInputController {

	/**
	 *
	 * @returns {typeof NrPasswordInputController}
	 */
	get Class () {
		return NrPasswordInputController;
	}

	/**
	 *
	 * @returns {NrTag|string}
	 */
	static get nrName () {
		return NrTag.PASSWORD_INPUT;
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

	// noinspection JSUnusedGlobalSymbols
	/**
	 * Handles ngModel controller getter for AngularJS required feature.
	 *
	 * @returns {ngModel.ngModelController}
	 */
	get ngModelController () {

		return super.ngModelController;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * Handles ngModel controller setter for AngularJS required feature.
	 *
	 * @param controller {ngModel.ngModelController}
	 */
	set ngModelController (controller) {

		super.ngModelController = controller;

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
	get innerViewValue () {

		return super.innerViewValue;

	}

	/**
	 * Sets internal nrInput element's model value; eg. it is our view value.
	 *
	 * This is used from the template by AngularJS two way binding.
	 *
	 * @param value {string}
	 */
	set innerViewValue (value) {

		super.innerViewValue = value;

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
	get nrType () {

		return super.nrType;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set nrType (value) {

		super.nrType = value;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {string|undefined}
	 */
	get nrId () {

		return super.nrId;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set nrId (value) {

		super.nrId = value;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {string|undefined}
	 */
	get name () {

		return super.name;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set nrName (value) {

		super.nrName = value;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {NrTextField|undefined}
	 */
	get nrModel () {

		return super.nrModel;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {NrTextField|undefined}
	 */
	set nrModel (value) {

		super.nrModel = value;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {string|undefined}
	 */
	get nrLabel () {

		return super.nrLabel;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set nrLabel (value) {

		super.nrLabel = value;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {string|undefined}
	 */
	get ngModel () {

		return super.ngModel;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set ngModel (value) {

		super.ngModel = value;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {NrFormController|undefined}
	 */
	get nrFormController () {

		return super.nrFormController;

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {NrFormController|undefined}
	 */
	set nrFormController (value) {

		super.nrFormController = value;

	}

	/**
	 *
	 * @param $event
	 */
	onLabelClick ($event) {

		super.onLabelClick($event);

	}

}

// noinspection JSUnusedGlobalSymbols
export default NrPasswordInputController;
