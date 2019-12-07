import NrTextInputController from '../nrTextInput/NrTextInputController.js';
import NrTag from "../../NrTag";
import LogUtils from "@norjs/utils/Log";
import NrIconValue from "../../../models/NrIconValue";

// noinspection JSUnusedLocalSymbols
const nrLog = LogUtils.getLogger(NrTag.CHECKBOX_INPUT);

// noinspection JSUnusedLocalSymbols
/**
 *
 * @enum {Symbol}
 * @readonly
 */
const PRIVATE = {
	$element: Symbol('$element')
};

/**
 *
 * FIXME: Implement support for ng-touched
 * @FIXME: This should not be extended from text input!
 */
export class NrCheckboxInputController extends NrTextInputController {

	/**
	 *
	 * @returns {typeof NrCheckboxInputController}
	 */
	get Class () {
		return NrCheckboxInputController;
	}

	/**
	 *
	 * @returns {NrTag|string}
	 */
	static get nrName () {
		return NrTag.CHECKBOX_INPUT;
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
	 * @param $translate {angular.translate.ITranslateService}
	 * @ngInject
	 */
	constructor (
		$attrs
		, $element
		, $translate
	) {
		'ngInject';

		super($attrs, $element, $translate);

		/**
		 *
		 * @member {JQLite}
		 * @private
		 */
		this[PRIVATE.$element] = $element;

	}

	$onDestroy () {

		super.$onDestroy();

		this[PRIVATE.$element] = undefined;

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
	 * @returns {boolean}
	 */
	get bindModelValue () {

		// noinspection JSValidateTypes
		return super.bindModelValue;

	}

	/**
	 * Sets internal nrInput element's model value; eg. it is our view value.
	 *
	 * This is used from the template by AngularJS two way binding.
	 *
	 * @param value {boolean}
	 */
	set bindModelValue (value) {

		// noinspection JSValidateTypes
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

		$event.preventDefault();
		$event.stopPropagation();

		this.bindModelValue = !this.bindModelValue;

		const ngModelController = this.getNgModelController();

		if (ngModelController) {
			ngModelController.$setDirty();
			ngModelController.$setTouched();
		}

		// const input = this[PRIVATE.$element][0].querySelector('input');
		//
		// if (input) {
		// 	input.checked = !input.checked;
		// 	nrLog.trace(`onLabelClick(): Input checked toggled: `, input.checked);
		// } else {
		// 	nrLog.error(`onLabelClick(): No input element found.`);
		// }

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

	/**
	 * @returns {NrIconValue|string}
	 */
	get checkboxIconValue () {

		return this.bindModelValue ? NrIconValue.CHECKBOX_CHECKED : NrIconValue.CHECKBOX_UNCHECKED;

	}

}

// noinspection JSUnusedGlobalSymbols
export default NrCheckboxInputController;
