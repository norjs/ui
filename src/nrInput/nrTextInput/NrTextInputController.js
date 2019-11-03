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
			bindNrType: `@?${NrAttribute.TYPE}` // FIXME: This is not used?
			, bindNrId: `@?${NrAttribute.ID}` // FIXME: This is not used?
			, bindNrName: `@?${NrAttribute.NAME}`
			, bindNrModel: `<?${NrAttribute.MODEL}`
			, bindNrLabel: `@?${NrAttribute.LABEL}`
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

		if (this[PRIVATE.nrFormController]) {
			this[PRIVATE.nrFormController].unregisterFieldController(this);
			this[PRIVATE.nrFormController] = undefined;
		}

		this[PRIVATE.$element] = undefined;

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
	getName () {

		if (this[PRIVATE.name]) {
			return this[PRIVATE.name];
		}

		return this[PRIVATE.nrModel] ? this[PRIVATE.nrModel].name : undefined;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * Handles ngModel controller setter for AngularJS required feature.
	 *
	 * @param controller {ngModel.ngModelController}
	 */
	setNgModelController (controller) {

		nrLog.trace(`${this.nrName}: setNgModelController(): controller = `, controller);

		if (controller) {

			this[PRIVATE.ngModelController] = controller;

			this[PRIVATE.ngModelController].$render = () => this.onNgModelRender();

			nrLog.trace(`${this.nrName}: setNgModelController(): Installed ngModelController: `, controller);

		} else if (this[PRIVATE.ngModelController]) {

			this[PRIVATE.ngModelController] = undefined;

			nrLog.trace(`${this.nrName}: setNgModelController(): Removed ngModelController`);

		} else {

			nrLog.warn(`${this.nrName}: setNgModelController(): ngModelController was already removed`);

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

		if (ngModelController) {

			ngModelController.$setViewValue(value, trigger);
			ngModelController.$setDirty();

		} else {

			nrLog.warn(`${this.nrName}.setViewValue(): No ngModelController found!`);

		}

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

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {string|undefined}
	 */
	get bindNrType () {
		return this[PRIVATE.type];
	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set bindNrType (value) {

		if (this[PRIVATE.type] !== value) {
			this[PRIVATE.type] = value;
		}

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {string|undefined}
	 */
	get bindNrId () {
		return this[PRIVATE.id];
	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set bindNrId (value) {

		if (this[PRIVATE.id] !== value) {
			this[PRIVATE.id] = value;
		}

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {string|undefined}
	 */
	get bindNrName () {

		return this[PRIVATE.name];

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set bindNrName (value) {

		if (this[PRIVATE.name] !== value) {
			this[PRIVATE.name] = value;
		}

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {NrTextField|undefined}
	 */
	get bindNrModel () {

		return this[PRIVATE.nrModel];

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {NrTextField|undefined}
	 */
	set bindNrModel (value) {

		if (this[PRIVATE.nrModel] !== value) {

			this[PRIVATE.nrModel] = value;

			nrLog.trace(`${this.nrName}[set bindNrModel]: Model set as `, value);

		}

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {string|undefined}
	 */
	get bindNrLabel () {
		return this[PRIVATE.label];
	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set bindNrLabel (value) {

		if (this[PRIVATE.label] !== value) {
			this[PRIVATE.label] = value;
		}

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {string|undefined}
	 */
	get bindNgModel () {
		return this[PRIVATE.ngModel];
	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {string|undefined}
	 */
	set bindNgModel (value) {

		if (this[PRIVATE.ngModel] !== value) {

			this[PRIVATE.ngModel] = value;

		}

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @returns {NrFormController|undefined}
	 */
	get bindNrFormController () {
		return this[PRIVATE.nrFormController];
	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS uses this in bindings.
	 *
	 * @param value {NrFormController|undefined}
	 */
	set bindNrFormController (value) {

		if (this[PRIVATE.nrFormController] !== value) {

			if (this[PRIVATE.nrFormController]) {
				this[PRIVATE.nrFormController].unregisterFieldController(this);
				this[PRIVATE.nrFormController] = undefined;
			}

			this[PRIVATE.nrFormController] = value;

			nrLog.trace(`nrFormController set as: `, value);

			this[PRIVATE.nrFormController].registerFieldController(this);

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
