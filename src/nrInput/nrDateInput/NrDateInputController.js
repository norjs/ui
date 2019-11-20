import _ from 'lodash';
import moment from "moment";
import NrAttribute from "../../NrAttribute";
import NgAttribute from "../../NgAttribute";
import NrTag from "../../NrTag";
import LogUtils from "@norjs/utils/Log";
import { NrTextInputController } from "../nrTextInput/NrTextInputController";

// noinspection JSUnusedLocalSymbols
const nrLog = LogUtils.getLogger(NrTag.DATE_INPUT);

/**
 *
 * @enum {Symbol}
 * @readonly
 */
const PRIVATE = {
	useLabel: Symbol('_useLabel')
	, ngModelController: Symbol('_ngModelController')
	, ngModel: Symbol('_ngModel')
	, innerViewValue: Symbol('_innerViewValue')
	, focus: Symbol('_focus')
	, nrFormController: Symbol('_nrFormController')
	, type: Symbol('_type')
	, id: Symbol('_id')
	, name: Symbol('_name')
	, nrModel: Symbol('_nrModel')
	, label: Symbol('_label')
	, $element: Symbol('_$element')
	, $timeout: Symbol('_$timeout')
};

/**
 *
 * TODO: Implement support for ng-touched: $setTouched(): A model is considered to be touched when the user has first
 *       focused the control element and then shifted focus away from the control (blur event).
 *
 * @ngInject
 */
export class NrDateInputController extends NrTextInputController {

	/**
	 *
	 * @returns {NrTag|string}
	 */
	static get nrName () {
		return NrTag.DATE_INPUT;
	}

	/**
	 *
	 * @returns {typeof NrDateInputController}
	 */
	get Class () {
		return NrDateInputController;
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
			, bindNrLabel: `@?${NgAttribute.LABEL}`
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
			template: `${template}`
			, bindings: this.getComponentBindings()
			, require: this.getComponentRequire()
			, controller: this
		};
	}

	static get MODEL_DATE_FORMAT () {
		return 'YYYY-MM-DD';
	}

	get MODEL_DATE_FORMAT () {
		return this.Class.MODEL_DATE_FORMAT;
	}

	static get VIEW_DATE_FORMAT () {
		return 'DD.MM.YYYY';
	}

	get VIEW_DATE_FORMAT () {
		return this.Class.VIEW_DATE_FORMAT;
	}

	/**
	 *
	 * @param $attrs {angular.IAttributes}
	 * @param $element {JQLite}
	 * @param $timeout {angular.ITimeoutService}
	 * @ngInject
	 */
	constructor ($attrs, $element, $timeout) {

		super($attrs, $element);

		/**
		 *
		 * @member {angular.ITimeoutService}
		 * @private
		 */
		this[PRIVATE.$timeout] = $timeout;

		/**
		 * If `true`, the model value will be normalized after next blur.
		 *
		 * @member {boolean}
		 * @private
		 */
		this._normalizeModelValueNextBlur = false;

	}

	$onDestroy () {

		super.$onDestroy();

		this[PRIVATE.$timeout] = undefined;

	}

	/**
	 *
	 * @returns {boolean}
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

	// noinspection JSUnusedGlobalSymbols
	/**
	 * Handles ngModel controller setter for AngularJS required feature.
	 *
	 * @param controller {ngModel.ngModelController}
	 */
	setNgModelController (controller) {
		return super.setNgModelController(controller);
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
	 *
	 * @protected
	 */
	_initNgModelController () {

		super._initNgModelController();

		const ngModelController = this.getNgModelController();

		// Setup $parsers
		ngModelController.$parsers.push(
			(value) => this._valueParser(value)
		);

		// Setup $formatters
		ngModelController.$formatters.push(
			(value) => this._valueFormatter(value)
		);

		// Setup $validators
		ngModelController.$validators.nrDateInputValidator = (modelValue, viewValue) => NrDateInputController._valueValidator(modelValue, viewValue);

		// FIXME: Implement cancelers for timeout on destroy

		// Validate model values after a short delay
		this[PRIVATE.$timeout]( () => {

			const modelValue = this._getModelValue();

			if ( this.Class.isViewDateString( modelValue.replace(/ +/, "") )) {

				const date = this.Class.parseViewStringToDate(modelValue);
				if (!this.Class.isValidDateValue(date)) return;

				const newModelValue = date.format(this.MODEL_DATE_FORMAT);
				this._setModelValue( newModelValue );
				//nrLog.trace(`Fixed model value: "${modelValue}" ==> "${newModelValue}"`);

				this._validateLater();

			}

		}, 0);

	}

	/**
	 * This function will be called whenever the control updates the ngModelController with a new $viewValue,
	 * usually via user nrInput.
	 *
	 * This function should return the parsed value which will end up as a model value (if valid).
	 *
	 * @param value {string} The view value, for example a date in format `"DD.MM.YYYY"`.
	 * @returns {string|undefined} The parsed model value, a date in format `"YYYY-MM-DD"`.
	 * @private
	 */
	_valueParser (value) {

		//const origValue = value;

		if (value === undefined) {
			//nrLog.trace(`valueParser "${origValue}" ==> undefined : already undefined`);
			return;
		}

		if (!_.isString(value)) {
			//nrLog.trace(`valueParser "${origValue}" ==> undefined : not string`);
			return;
		}

		value = value.replace(/ +/, "");

		if (value === "") {
			//nrLog.trace(`valueParser "${origValue}" ==> "" : empty string`);
			return "";
		}

		// Check if date was already in the model format
		if ( this.Class.isModelDateString(value) ) {
			const date = this.Class.parseModelStringToDate(value);
			if (!this.Class.isValidDateValue(date)) {
				//nrLog.trace(`valueParser "${origValue}" ==> undefined : not valid date`);
				return;
			}
			value = date.format(this.MODEL_DATE_FORMAT);
			//nrLog.trace(`valueParser "${origValue}" ==> "${value}" : already in model format`);
			return value;
		}

		// Check if date is in a correct view format
		if ( this.Class.isViewDateString(value) ) {
			const date = this.Class.parseViewStringToDate(value);
			if (!this.Class.isValidDateValue(date)) {
				//nrLog.trace(`valueParser "${origValue}" ==> undefined : not valid date`);
				return;
			}
			value = date.format(this.MODEL_DATE_FORMAT);
			//nrLog.trace(`valueParser "${origValue}" ==> "${value}" : correct format`);
			return value;
		}

		//nrLog.trace(`valueParser "${origValue}" ==> undefined : unknown format`);

	}

	/**
	 * This function will be called whenever the bound ngModel expression changes programmatically.
	 *
	 * It is ***not*** called when the value of the control is changed by user interaction.
	 *
	 * @param value {string} The model value, eg. date in format `"YYYY-MM-DD"`.
	 * @returns {string} The view value, a date in format `"DD.MM.YYYY"`.
	 * @private
	 */
	_valueFormatter (value) {

		const origValue = value;

		if (value === undefined) {
			//nrLog.trace(`valueFormatter: "${origValue}" ==> "" : was undefined`);
			return "";
		}

		if (!_.isString(value)) {
			//nrLog.trace(`valueFormatter: "${origValue}" ==> "" : not string`);
			return "";
		}

		value = value.replace(/ +/, "");

		if (value === "") {
			//nrLog.trace(`valueFormatter: "${origValue}" ==> "" : empty string`);
			return "";
		}

		// Check if date was in the model format
		if ( this.Class.isModelDateString(value) ) {

			const date = this.Class.parseModelStringToDate(value);
			if ( !this.Class.isValidDateValue(date) ) {
				//nrLog.trace(`valueFormatter: "${origValue}" ==> "${origValue}" : not valid date`);
				return origValue;
			}
			value = date.format(this.VIEW_DATE_FORMAT);
			//nrLog.trace(`valueFormatter: "${origValue}" ==> "${value}" : correct model format`);
			return value;

		}

		// Check if date is in a correct view format
		if ( this.Class.isViewDateString(value) ) {

			const date = this.Class.parseViewStringToDate(value);
			if ( !this.Class.isValidDateValue(date) ) {
				//nrLog.trace(`valueFormatter: "${origValue}" ==> "${origValue}" : not valid date`);
				return origValue;
			}
			value = date.format(this.VIEW_DATE_FORMAT);
			//nrLog.trace(`valueFormatter: "${origValue}" ==> "${value}" : in view format`);

			if (!this._normalizeModelValueNextBlur) {
				this._normalizeModelValueNextBlur = true;
			}

			return value;

		}

		//nrLog.trace(`valueFormatter: "${origValue}" ==> "${origValue}" : unknown format`);
		return origValue;

	}

	/**
	 * This function will be called whenever the model value changes.
	 *
	 * @param modelValue {string} The model value, eg. date in format `"YYYY-MM-DD"`.
	 * @param viewValue {string} The view value, for example a date in format `"DD.MM.YYYY"`.
	 * @returns {boolean} `true` if values are valid.
	 * @private
	 */
	static _valueValidator (modelValue, viewValue) {

		if (modelValue === undefined) return true;

		if (!_.isString(modelValue)) return false;

		if (modelValue.length === 0) return true;

		if (! this.isModelDateString(modelValue) ) return false;

		return this.isValidDateValue( this.parseModelStringToDate(modelValue) );

	}

	/**
	 * Normalizes model value based on the view value.
	 *
	 * @private
	 */
	_normalizeModelValue () {

		this._setModelValue( this._valueParser(this.getViewValue()) );

		this._validateLater();

	}

	/**
	 *
	 * @private
	 * @FIXME Timeout should be cancelled if component is destroyed
	 */
	_validateLater () {

		// $scope.$evalAsync nor $scope.$applyAsync did nothing, $timeout is required here.
		this[PRIVATE.$timeout]( () => {

			nrLog.trace('._normalizeModelValue(): Validating after a timeout...');

			const ngModelController = this.getNgModelController();

			if (ngModelController) {

				nrLog.trace('._normalizeModelValue(): Validating now.');
				ngModelController.$validate();

			} else {

				nrLog.warn(`._normalizeModelValue(): Warning! No ngModelController detected.`);

			}

		}, 0);

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
	 * See more at this._initNgModelController().
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
		return super.hasFocus();
	}

	/**
	 * Called through AngularJS binding.
	 *
	 * @param $event
	 */
	onFocus ($event) {

		super.onFocus($event);

		if (!this.getViewValue()) {
			this.setViewValue( moment().format(this.VIEW_DATE_FORMAT) );
		}

	}

	/**
	 * Called through AngularJS binding.
	 *
	 * @param $event
	 */
	onBlur ($event) {

		super.onBlur($event);

		if (this._normalizeModelValueNextBlur) {
			this._normalizeModelValueNextBlur = false;
			this._normalizeModelValue();
		}

	}

	/**
	 *
	 * @private
	 */
	_updateFocusStyles () {

		super._updateFocusStyles();

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {string|undefined}
	 */
	get bindNrType () {
		return super.bindNrType;
	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set bindNrType (value) {

		super.bindNrType = value;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {string|undefined}
	 */
	get bindNrId () {
		return super.bindNrId;
	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set bindNrId (value) {

		super.bindNrId = value;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {string|undefined}
	 */
	get bindNrName () {

		return super.bindNrName;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set bindNrName (value) {

		super.bindNrName = value;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {NrTextField|undefined}
	 */
	get bindNrModel () {

		return super.bindNrModel;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {NrTextField|undefined}
	 */
	set bindNrModel (value) {

		super.bindNrModel = value;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {string|undefined}
	 */
	get bindNrLabel () {
		return super.bindNrLabel;
	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set bindNrLabel (value) {

		super.bindNrLabel = value;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {string|undefined}
	 */
	get bindNgModel () {
		return super.bindNgModel;
	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set bindNgModel (value) {

		return super.bindNgModel = value;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {NrFormController|undefined}
	 */
	get bindNrFormController () {
		return super.bindNrFormController;
	}

	// noinspection JSUnusedGlobalSymbols
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

		super.onLabelClick($event);

	}

	/**
	 * Returns `true` if `value` is a string which contains a date like "YYYY-MM-DD".
	 *
	 * @param value {*}
	 * @returns {boolean}
	 */
	static isModelDateString (value) {
		return _.isString(value) && /^((19|20)[0-9]{2})-([0-9]{1,2})-([0-9]{1,2})$/.test(value);
	}

	/**
	 * Returns `true` if `value` is a string which contains a date like "DD.MM.YYYY".
	 *
	 * @param value
	 * @returns {boolean}
	 */
	static isViewDateString (value) {
		return _.isString(value) && /^([0-9]{1,2})\.([0-9]{1,2})\.((19|20)[0-9]{2})$/.test(value);
	}

	/**
	 *
	 * @param value {string}
	 * @returns {moment}
	 */
	static parseViewStringToDate (value) {
		return moment(value, this.VIEW_DATE_FORMAT);
	}

	/**
	 *
	 * @param value {string}
	 * @returns {moment}
	 */
	static parseModelStringToDate (value) {
		return moment(value, this.MODEL_DATE_FORMAT);
	}

	/**
	 *
	 * @param value {moment}
	 * @returns {boolean}
	 */
	static isValidDateValue (value) {
		return value.isValid();
	}

	/**
	 * Template uses this
	 * @returns {string|undefined}
	 */
	getPlaceholder () {
		return super.getPlaceholder();
	}

}

// noinspection JSUnusedGlobalSymbols
export default NrDateInputController;
