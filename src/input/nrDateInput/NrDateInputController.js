import _ from 'lodash';
import NrInputController from '../NrInputController.js';
import moment from "moment";
import NrAttribute from "../../NrAttribute";
import NgAttribute from "../../NgAttribute";
import NrTag from "../../NrTag";
import LogUtils from "@norjs/utils/Log";
import NrStyleClass from "../../NrStyleClass";

// noinspection JSUnusedLocalSymbols
const nrLog = LogUtils.getLogger(NrTag.DATE_INPUT);

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
 * TODO: Implement support for ng-touched: $setTouched(): A model is considered to be touched when the user has first
 * focused the control element and then shifted focus away from the control (blur event).
 *
 * @ngInject
 */
export class NrDateInputController extends NrInputController {

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
			__type: `@?${NrAttribute.TYPE}` // FIXME: This is not used?
			, __id: `@?${NrAttribute.ID}` // FIXME: This is not used?
			, __name: `@?${NrAttribute.NAME}` // FIXME: This is not used?
			, __label: `@?${NrAttribute.LABEL}`
			, __ngModel: `=?${NgAttribute.MODEL}`
		};
	}

	/**
	 *
	 * @returns {Object.<string, string>}
	 */
	static getComponentRequire () {
		return {
			__nrForm: `?^^${NrTag.FORM}`,
			__ngModelController: `?^${NgAttribute.MODEL}`
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

	/**
	 *
	 * @param $attrs {angular.IAttributes}
	 * @param $element {JQLite}
	 * @param $scope {angular.IScope}
	 * @param $timeout {angular.ITimeoutService}
	 * @ngInject
	 */
	constructor ($attrs, $element, $scope, $timeout) {

		super();

		/**
		 *
		 * @member {JQLite}
		 * @private
		 */
		this.$element = $element;

		/**
		 *
		 * @member {angular.IScope}
		 * @private
		 */
		this.$scope = $scope;

		/**
		 *
		 * @member {angular.ITimeoutService}
		 * @private
		 */
		this.$timeout = $timeout;

		/**
		 * If `true`, the model value will be normalized after next blur.
		 *
		 * @member {boolean}
		 * @private
		 */
		this._normalizeModelValueNextBlur = false;

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

		// noinspection JSUnusedGlobalSymbols
		/**
		 *
		 * @member {angular.IFormController|undefined}
		 * @private
		 */
		this.__nrForm = undefined;

		/**
		 * The state for our .useLabel() implementation.
		 *
		 * @member {boolean}
		 */
		this[PRIVATE.useLabel] = !!_.has($attrs, NgAttribute.LABEL);

		/**
		 * The ng-model's controller.
		 *
		 * @member {angular.INgModelController}
		 */
		this[PRIVATE.ngModelController] = undefined;

		/**
		 *
		 * @member {string}
		 */
		this[PRIVATE.ngModel] = undefined;

		/**
		 *
		 * @member {string}
		 */
		this[PRIVATE.innerViewValue] = undefined;

		/**
		 *
		 * @member {string}
		 * @fixme This should be from somewhere like a settings service
		 */
		this.MODEL_DATE_FORMAT = 'YYYY-MM-DD';

		/**
		 *
		 * @member {string}
		 */
		this.VIEW_DATE_FORMAT = 'DD.MM.YYYY';

		/**
		 * If `true`, this controller has focus.
		 *
		 * @member {boolean}
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
			this._initNgModelController();
		} else if (this[PRIVATE.ngModelController]) {
			this[PRIVATE.ngModelController] = undefined;
		}
	}

	/**
	 *
	 * @private
	 */
	_initNgModelController () {

		const ngModelController = this[PRIVATE.ngModelController];

		// Setup $render
		ngModelController.$render = () => this.onNgModelRender();

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
		this.$timeout( () => {
			const modelValue = this._getModelValue();
			if (_.isString(modelValue) && /^([0-9]{1,2})\.([0-9]{1,2})\.((19|20)[0-9]{2})$/.test(modelValue.replace(/ +/, ""))) {
				const date = moment(modelValue, "DD.MM.YYYY");
				if (!date.isValid()) return;

				const newModelValue = date.format(this.MODEL_DATE_FORMAT);
				this._setModelValue( newModelValue );
				//nrLog.trace(`Fixed model value: "${modelValue}" ==> "${newModelValue}"`);

				// $scope.$evalAsync nor $scope.$applyAsync did nothing, $timeout is required here.
				this.$timeout( () => {
					//nrLog.trace('Validating...');
					this.getNgModelController().$validate();
				}, 0);
			}
		}, 0);

	}

	/**
	 * This function will be called whenever the control updates the ngModelController with a new $viewValue,
	 * usually via user input.
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
		if (/^((19|20)[0-9]{2})-([0-9]{1,2})-([0-9]{1,2})$/.test(value)) {
			const date = moment(value, "YYYY-MM-DD");
			if (!date.isValid()) {
				//nrLog.trace(`valueParser "${origValue}" ==> undefined : not valid date`);
				return;
			}
			value = date.format(this.MODEL_DATE_FORMAT);
			//nrLog.trace(`valueParser "${origValue}" ==> "${value}" : already in model format`);
			return value;
		}

		// Check if date is in a correct view format
		if (/^([0-9]{1,2})\.([0-9]{1,2})\.((19|20)[0-9]{2})$/.test(value)) {
			const date = moment(value, "DD.MM.YYYY");
			if (!date.isValid()) {
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
		if (/^((19|20)[0-9]{2})-([0-9]{1,2})-([0-9]{1,2})$/.test(value)) {
			const date = moment(value, "YYYY-MM-DD");
			if (!date.isValid()) {
				//nrLog.trace(`valueFormatter: "${origValue}" ==> "${origValue}" : not valid date`);
				return origValue;
			}
			value = date.format(this.VIEW_DATE_FORMAT);
			//nrLog.trace(`valueFormatter: "${origValue}" ==> "${value}" : correct model format`);
			return value;
		}

		// Check if date is in a correct view format
		if (/^([0-9]{1,2})\.([0-9]{1,2})\.((19|20)[0-9]{2})$/.test(value)) {
			const date = moment(value, "DD.MM.YYYY");
			if (!date.isValid()) {
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
		if (! /^((19|20)[0-9]{2})-([0-9]{2})-([0-9]{2})$/.test(modelValue) ) return false;
		return moment(modelValue, "YYYY-MM-DD").isValid();
	}

	/**
	 * Normalizes model value based on the view value.
	 *
	 * @private
	 */
	_normalizeModelValue () {
		this._setModelValue( this._valueParser(this.getViewValue()) );
		if (this.hasNgModelController()) {
			// $scope.$evalAsync nor $scope.$applyAsync did nothing, $timeout is required here.
			this.$timeout( () => {
				//nrLog.trace('Validating...');
				this.getNgModelController().$validate();
			}, 0);
		}
	}

	/**
	 * Returns true if we already have AngularJS angular.INgModelController registered to this component.
	 *
	 * *Note!* This is ***NOT*** the ng-model controller of the child input element which is in the template.
	 *
	 * @returns {boolean}
	 */
	hasNgModelController () {
		return !!this[PRIVATE.ngModelController];
	}

	/**
	 * Returns AngularJS angular.INgModelController of this component, if one exists.
	 *
	 * *Note!* This is ***NOT*** the ng-model controller of the child input element in the template.
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
	 * See more at this._initNgModelController().
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
	 * @param value
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
	 * Called from the template when inner input element changes model value, eg. our inner view value.
	 */
	onChange () {
		this.setViewValue(this.innerViewValue, undefined);
	}

	/**
	 * Get internal input element's model value; eg. it is our view value.
	 *
	 * This is used from the template by AngularJS two way binding.
	 *
	 * @returns {string}
	 */
	get innerViewValue () {
		return this[PRIVATE.innerViewValue];
	}

	/**
	 * Sets internal input element's model value; eg. it is our view value.
	 *
	 * This is used from the template by AngularJS two way binding.
	 *
	 * @param value {string}
	 */
	set innerViewValue (value) {
		this[PRIVATE.innerViewValue] = value;
	}

	/**
	 * Called through AngularJS binding.
	 *
	 * @param $event
	 */
	onFocus ($event) {
		this[PRIVATE.focus] = true;
		this._updateFocusStyles();

		if (!this.getViewValue()) {
			this._setModelValue(moment().format(this.MODEL_DATE_FORMAT));
		}
	}

	/**
	 * Called through AngularJS binding.
	 *
	 * @param $event
	 */
	onBlur ($event) {
		this[PRIVATE.focus] = false;
		this._updateFocusStyles();

		if (this._normalizeModelValueNextBlur) {
			this._normalizeModelValueNextBlur = false;
			this._normalizeModelValue();
		}
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
	 * @private
	 */
	_updateFocusStyles () {

		this.Class.toggleClass(this.$element, NrStyleClass.FOCUS, this[PRIVATE.focus]);

	}

}

// noinspection JSUnusedGlobalSymbols
export default NrDateInputController;
