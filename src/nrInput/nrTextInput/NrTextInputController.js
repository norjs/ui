import _ from 'lodash';
import NrInputController from '../NrInputController.js';
import NrStyleClass from "../../NrStyleClass";
import NrTag from "../../NrTag";
import LogUtils from "@norjs/utils/Log";
import NrAttribute from "../../NrAttribute";
import NgAttribute from "../../NgAttribute";

// noinspection JSUnusedLocalSymbols
const nrLog = LogUtils.getLogger(NrTag.TEXT_INPUT);

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
};

/**
 *
 * FIXME: Implement support for ng-touched
 *
 * @ngInject
 */
export class NrTextInputController extends NrInputController {

	/**
	 *
	 * @returns {typeof NrTextInputController}
	 */
	get Class () {
		return NrTextInputController;
	}

	/**
	 *
	 * @returns {NrTag|string}
	 */
	static get nrName () {
		return NrTag.TEXT_INPUT;
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
	 * @returns {Object}
	 */
	static getComponentBindings () {
		return {
			nrType: `@?${NrAttribute.TYPE}` // FIXME: This is not used?
			, nrId: `@?${NrAttribute.ID}` // FIXME: This is not used?
			, nrName: `@?${NrAttribute.NAME}` // FIXME: This is not used?
			, nrModel: `<?${NrAttribute.MODEL}`
			, nrLabel: `@?${NrAttribute.LABEL}`
			, ngModel: `=?${NgAttribute.MODEL}`
		};
	}

	/**
	 *
	 * @returns {Object.<string, string>}
	 */
	static getComponentRequire () {
		return {
			nrFormController: `?^^${NrTag.FORM}`,
			ngModelController: `?^${NgAttribute.MODEL}`
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
	constructor (
		$attrs
		, $element
	) {

		super();

		/**
		 *
		 * @member {boolean}
		 * @private
		 */
		this[PRIVATE.useLabel] = !!_.has($attrs, NgAttribute.LABEL);

		/**
		 *
		 * @member {JQLite}
		 * @private
		 */
		this[PRIVATE.$element] = $element;

		/**
		 *
		 * @member {string|undefined}
		 * @private
		 */
		this[PRIVATE.type] = undefined;

		/**
		 *
		 * @member {string|undefined}
		 * @private
		 */
		this[PRIVATE.id] = undefined;

		// noinspection JSUnusedGlobalSymbols
		/**
		 *
		 * @member {string|undefined}
		 * @private
		 */
		this[PRIVATE.name] = undefined;

		/**
		 *
		 * @member {string|undefined}
		 * @private
		 */
		this[PRIVATE.label] = undefined;

		/**
		 *
		 * @member {NrTextField|undefined}
		 * @private
		 */
		this[PRIVATE.nrModel] = undefined;

		/**
		 *
		 * @member {NrFormController|undefined}
		 * @private
		 */
		this[PRIVATE.nrFormController] = undefined;

		/**
		 * The
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

	$onDestroy () {

		this[PRIVATE.$element] = undefined;
		this[PRIVATE.nrFormController] = undefined;
		this[PRIVATE.ngModelController] = undefined;

	}

	/**
	 *
	 * @returns {boolean|undefined}
	 */
	useLabel () {

		if ( this[PRIVATE.useLabel] ) {
			return true;
		}

		return !!( this[PRIVATE.nrModel] && this[PRIVATE.nrModel].label );

	}

	/**
	 * Returns label text for this element.
	 *
	 * @returns {string}
	 */
	getLabel () {

		if ( this[PRIVATE.useLabel] ) {
			return this[PRIVATE.label];
		}

		return this[PRIVATE.nrModel] ? this[PRIVATE.nrModel].label : undefined;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * Handles ngModel controller getter for AngularJS required feature.
	 *
	 * @returns {ngModel.ngModelController}
	 */
	get ngModelController () {
		return this[PRIVATE.ngModelController];
	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * Handles ngModel controller setter for AngularJS required feature.
	 *
	 * @param controller {ngModel.ngModelController}
	 */
	set ngModelController (controller) {
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
	 * See more at setter for ngModelController.
	 */
	onNgModelRender () {

		this.innerViewValue = this.getViewValue();

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
		return this[PRIVATE.innerViewValue];
	}

	/**
	 * Sets internal nrInput element's model value; eg. it is our view value.
	 *
	 * This is used from the template by AngularJS two way binding.
	 *
	 * @param value {string}
	 */
	set innerViewValue (value) {
		this[PRIVATE.innerViewValue] = value;
	}

	// noinspection JSUnusedGlobalSymbols
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

		this.Class.toggleClass(this[PRIVATE.$element], NrStyleClass.FOCUS, this[PRIVATE.focus]);

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {string|undefined}
	 */
	get nrType () {
		return this[PRIVATE.type];
	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set nrType (value) {

		if (this[PRIVATE.type] !== value) {
			this[PRIVATE.type] = value;
		}

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {string|undefined}
	 */
	get nrId () {
		return this[PRIVATE.id];
	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set nrId (value) {

		if (this[PRIVATE.id] !== value) {
			this[PRIVATE.id] = value;
		}

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {string|undefined}
	 */
	get name () {
		return this[PRIVATE.name];
	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set nrName (value) {

		if (this[PRIVATE.name] !== value) {
			this[PRIVATE.name] = value;
		}

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {NrTextField|undefined}
	 */
	get nrModel () {

		return this[PRIVATE.nrModel];

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {NrTextField|undefined}
	 */
	set nrModel (value) {

		if (this[PRIVATE.nrModel] !== value) {
			this[PRIVATE.nrModel] = value;
		}

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {string|undefined}
	 */
	get nrLabel () {
		return this[PRIVATE.label];
	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set nrLabel (value) {

		if (this[PRIVATE.label] !== value) {
			this[PRIVATE.label] = value;
		}

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {string|undefined}
	 */
	get ngModel () {
		return this[PRIVATE.ngModel];
	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set ngModel (value) {

		if (this[PRIVATE.ngModel] !== value) {
			this[PRIVATE.ngModel] = value;
		}

	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {NrFormController|undefined}
	 */
	get nrFormController () {
		return this[PRIVATE.nrFormController];
	}

	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {NrFormController|undefined}
	 */
	set nrFormController (value) {

		if (this[PRIVATE.nrFormController] !== value) {
			this[PRIVATE.nrFormController] = value;
		}

	}

	/**
	 *
	 * @param $event
	 */
	onLabelClick ($event) {

		this[PRIVATE.$element][0].querySelector('input').focus();

	}

}

// noinspection JSUnusedGlobalSymbols
export default NrTextInputController;
