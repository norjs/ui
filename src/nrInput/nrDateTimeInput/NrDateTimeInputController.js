import _ from 'lodash';
import moment from "moment";
import NrAttribute from "../../NrAttribute";
import NgAttribute from "../../NgAttribute";
import NrTag from "../../NrTag";
import LogUtils from "@norjs/utils/Log";
import { NrTextInputController } from "../nrTextInput/NrTextInputController";
import StringUtils from "@norjs/utils/src/StringUtils";

// noinspection JSUnusedLocalSymbols
const nrLog = LogUtils.getLogger(NrTag.DATE_TIME_INPUT);

/**
 *
 * @enum {Symbol}
 * @readonly
 */
const PRIVATE = {
	useLabel: Symbol('_useLabel')
	, ngModelController: Symbol('_ngModelController')
	, ngModel: Symbol('_ngModel')
	, focus: Symbol('_focus')
	, nrFormController: Symbol('_nrFormController')
	, type: Symbol('_type')
	, id: Symbol('_id')
	, name: Symbol('_name')
	, nrModel: Symbol('_nrModel')
	, label: Symbol('_label')
	, $element: Symbol('_$element')
	, $timeout: Symbol('_$timeout')
	, validateTimeout: Symbol('_validateTimeout')
	, initialNormalizeTimeout: Symbol('_initialNormalizeTimeout')
};

/**
 *
 * @TODO: Implement support for ng-touched: $setTouched(): A model is considered to be touched when the user has first
 *        focused the control element and then shifted focus away from the control (blur event).
 * @ngInject
 */
export class NrDateTimeInputController extends NrTextInputController {

	/**
	 *
	 * @returns {NrTag|string}
	 */
	static get nrName () {
		return NrTag.DATE_TIME_INPUT;
	}

	/**
	 *
	 * @returns {typeof NrDateTimeInputController}
	 */
	get Class () {
		return NrDateTimeInputController;
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
			, bindNrId: `@?${NrAttribute.ID}`
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
		return moment.ISO_8601;
	}

	static get VIEW_DATE_FORMAT () {
		return 'DD.MM.YYYY HH:mm';
	}

	get MODEL_DATE_FORMAT () {
		return this.Class.MODEL_DATE_FORMAT;
	}

	get VIEW_DATE_FORMAT () {
		return this.Class.VIEW_DATE_FORMAT;
	}

	static get $inject () {
		return ["$attrs", "$element", "$timeout"];
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
		 *
		 * @member {angular.IPromise|undefined}
		 * @private
		 */
		this[PRIVATE.validateTimeout] = undefined;

		/**
		 *
		 * @member {angular.IPromise|undefined}
		 * @private
		 */
		this[PRIVATE.initialNormalizeTimeout] = undefined;

		// /**
		//  * If `true`, the model value will be normalized after next blur.
		//  *
		//  * @member {boolean}
		//  * @private
		//  */
		// this._normalizeModelValueFromViewValueNextBlur = false;

	}

	$onDestroy () {

		super.$onDestroy();

		if ( this[PRIVATE.validateTimeout] !== undefined ) {
			this[PRIVATE.$timeout].cancel(this[PRIVATE.validateTimeout]);
			this[PRIVATE.validateTimeout] = undefined;
		}

		if ( this[PRIVATE.initialNormalizeTimeout] !== undefined ) {
			this[PRIVATE.$timeout].cancel(this[PRIVATE.initialNormalizeTimeout]);
			this[PRIVATE.initialNormalizeTimeout] = undefined;
		}

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
		ngModelController.$validators.nrDateTimeInputValidator = (modelValue, viewValue) => NrDateTimeInputController._valueValidator(modelValue, viewValue);

		// Normalize model value after a short delay
		const timeout = this[PRIVATE.initialNormalizeTimeout] = this[PRIVATE.$timeout]( () => {

			if (timeout === this[PRIVATE.initialNormalizeTimeout]) {
				this[PRIVATE.initialNormalizeTimeout] = undefined;
			}

			this._normalizeModelValueFromModelValue();

		}, 0);

	}

	/**
	 * Reads current model value and re-formats it to the correct model value format if it is not already.
	 *
	 * @private
	 */
	_normalizeModelValueFromModelValue () {

		const modelValue = this._getModelValue();

		const newModelValue = this.Class._parseValueToModelValue(modelValue ? _.trim(modelValue).replace(/ +/, " ") : undefined );

		if ( modelValue !== newModelValue ) {

			this._setModelValue( newModelValue );

			nrLog.trace(`Fixed model value: "${modelValue}" ==> "${newModelValue}"`);

			this._validateLater();

		}

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

		const origValue = value;

		if (value === undefined) {
			nrLog.trace(`._valueParser(): already undefined: ${LogUtils.getAsString(origValue)} ==> undefined`);
			return undefined;
		}

		if (!_.isString(value)) {
			nrLog.trace(`._valueParser(): not string: ${LogUtils.getAsString(origValue)} ==> undefined`);
			return undefined;
		}

		value = _.trim(value).replace(/ +/, " ");

		if (value === "") {
			nrLog.trace(`._valueParser(): empty string: ${LogUtils.getAsString(origValue)} ==> ""`);
			return "";
		}

		const newValue = this.Class._parseValueToModelValue(value);

		if ( newValue !== origValue ) {

			nrLog.trace(`._valueParser(): ${LogUtils.getAsString(origValue)} ==> "${newValue}"`);
			return newValue;

		} else {

			return origValue;

		}

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
			nrLog.trace(`_valueFormatter(): Undefined: ${LogUtils.getAsString(origValue)} ==> ""`);
			return "";
		}

		if (!_.isString(value)) {
			nrLog.trace(`_valueFormatter(): Not string: ${LogUtils.getAsString(origValue)} ==> ""`);
			return "";
		}

		value = _.trim(value).replace(/ +/, " ");

		if (value === "") {
			nrLog.trace(`_valueFormatter(): Empty string: ${LogUtils.getAsString(origValue)} ==> ""`);
			return "";
		}

		const date = this.Class._parseValueToDate(value);

		if ( !date ) {
			nrLog.trace(`_valueFormatter(): Not valid date: ${LogUtils.getAsString(origValue)} ==> "${origValue}"`);
			return origValue;
		}

		// if (!this._normalizeModelValueFromViewValueNextBlur) {
		// 	this._normalizeModelValueFromViewValueNextBlur = true;
		// }

		const newValue = this.Class._formatDateToViewValue( date );

		if (newValue !== origValue) {

			nrLog.trace(`_valueFormatter(): ${LogUtils.getAsString(origValue)} ==> "${newValue}"`);
			return newValue;

		} else {

			return origValue;

		}


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
	_normalizeModelValueFromViewValue () {

		this._setModelValue( this._valueParser(this.getViewValue()) );

		this._validateLater();

	}

	/**
	 * Validates the field again after a short delay.
	 *
	 * @private
	 */
	_validateLater () {

		if ( this[PRIVATE.validateTimeout] !== undefined ) {
			nrLog.trace('._validateLater(): Cancelling previous validation...');
			this[PRIVATE.$timeout].cancel(this[PRIVATE.validateTimeout]);
			this[PRIVATE.validateTimeout] = undefined;
		}

		// $scope.$evalAsync nor $scope.$applyAsync did nothing, $timeout is required here.

		nrLog.trace('._validateLater(): Validating after a timeout...');

		const timeout = this[PRIVATE.validateTimeout] = this[PRIVATE.$timeout]( () => {

			if (timeout === this[PRIVATE.validateTimeout]) {
				this[PRIVATE.validateTimeout] = undefined;
			}

			const ngModelController = this.getNgModelController();

			if (ngModelController) {

				nrLog.trace('._validateLater(): Validating now.');
				ngModelController.$validate();

			} else {

				nrLog.warn(`._validateLater(): Warning! No ngModelController detected.`);

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
			this.setViewValue( this.Class._formatDateToViewValue(moment()), $event );
		}

	}

	/**
	 * Called through AngularJS binding.
	 *
	 * @param $event
	 */
	onBlur ($event) {

		super.onBlur($event);

		// if (this._normalizeModelValueFromViewValueNextBlur) {
		// 	this._normalizeModelValueFromViewValueNextBlur = false;
		// 	this._normalizeModelValueFromViewValue();
		// }

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
	 * @returns {NrDateTimeField|undefined}
	 */
	get bindNrModel () {

		return super.bindNrModel;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {NrDateTimeField|undefined}
	 */
	set bindNrModel (value) {

		// Note! We have intentionally overwritten super's implementation here

		if ( this.nrModel !== value ) {

			this._setNrModel(value);

			if ( value && _.isString(value.value) ) {

				this.bindModelValue = value.value;

				nrLog.trace(`${this.nrName}[set bindNrModel](): Field model value initialized as ${value.value}`);

				this._normalizeModelValueFromModelValue();

			}

		}

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
		return StringUtils.isDateString(value);
	}

	/**
	 * Returns `true` if `value` is a string which contains a date like "DD.MM.YYYY".
	 *
	 * @param value
	 * @returns {boolean}
	 */
	static isViewDateString (value) {
		return _.isString(value) && /^([0-9]{1,2})\.([0-9]{1,2})\.((19|20)[0-9]{2}) ([0-9]{1,2})[:.]([0-9]{2})$/.test(value);
	}

	/**
	 *
	 * @param value {string}
	 * @returns {moment.Moment}
	 */
	static parseViewStringToDate (value) {
		return moment(value, this.VIEW_DATE_FORMAT);
	}

	/**
	 *
	 * @param value {string}
	 * @returns {moment.Moment}
	 */
	static parseModelStringToDate (value) {
		return moment(value, this.MODEL_DATE_FORMAT);
	}

	/**
	 *
	 * @param value {moment.Moment}
	 * @returns {boolean}
	 */
	static isValidDateValue (value) {
		return value.isValid();
	}

	/**
	 * Detects and parses multiple different formats to the moment date object.
	 *
	 * @param value {string}
	 * @returns {moment.Moment|undefined}
	 */
	static _parseValueToDate (value) {

		const origValue = value;

		// Check if date was already in the model format
		if ( this.isModelDateString(value) ) {
			const date = this.parseModelStringToDate(value);
			if (!this.isValidDateValue(date)) {
				nrLog.trace(`._parseValueToDate(): as ModelValue: "${origValue}" ==> undefined : not valid date`);
				return undefined;
			}
			return date;
		}

		// Check if date is in a correct view format
		if ( this.isViewDateString(value) ) {
			const date = this.parseViewStringToDate(value);
			if (!this.isValidDateValue(date)) {
				nrLog.trace(`._parseValueToDate(): as ViewValue: "${origValue}" ==> undefined : not valid date`);
				return undefined;
			}
			return date;
		}

		// Check if value is a UTC timestamp
		if ( StringUtils.isDateString(value) ) {

			const date = moment(value);

			if (!this.isValidDateValue(date)) {
				nrLog.trace(`._parseValueToDate(): as ISO value: "${origValue}" ==> undefined : not valid date`);
				return undefined;
			}

			return date;

		}

		nrLog.trace(`._parseValueToDate(): ${LogUtils.getAsString(origValue)} ==> undefined : format not recognized`);
		return undefined;

	}

	/**
	 * Detect and parse multiple different formats to the model's date format.
	 *
	 * @param value {string} Value in different formats.
	 * @returns {string|undefined} The value as model's format, eg. `"YYYY-MM-DD"`.
	 */
	static _parseValueToModelValue (value) {

		const date = this._parseValueToDate(value);

		nrLog.trace(`${this.nrName}._parseValueToModelValue(): date = `, date);

		return date ? this._formatDateToModelValue(date) : undefined;

	}

	/**
	 *
	 * @param date {moment.Moment}
	 * @returns {string}
	 * @private
	 */
	static _formatDateToViewValue (date) {

		return date.format(this.VIEW_DATE_FORMAT);

	}

	/**
	 *
	 * @param date {moment.Moment}
	 * @returns {string}
	 * @private
	 */
	static _formatDateToModelValue (date) {

		if (this.MODEL_DATE_FORMAT === moment.ISO_8601) {

			return date.toISOString();

		} else {

			return date.format(this.MODEL_DATE_FORMAT);

		}


	}

	/**
	 * Template uses this
	 * @returns {string|undefined}
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
export default NrDateTimeInputController;
