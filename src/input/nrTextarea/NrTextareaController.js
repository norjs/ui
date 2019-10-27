import _ from 'lodash';
import NrInputController from '../NrInputController.js';
import NrStyleClass from "../../NrStyleClass";
import NrTag from "../../NrTag";
import NgAttribute from "../../NgAttribute";
import NrAttribute from "../../NrAttribute";
import LogUtils from "@norjs/utils/Log";

// noinspection JSUnusedLocalSymbols
const nrLog = LogUtils.getLogger(NrTag.TEXTAREA);

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
export class NrTextareaController extends NrInputController {

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
		return this.Class.nrName;
	}

	/**
	 *
	 * @returns {{__name: string, __ngModel: string, __type: string, __id: string, __label: string}}
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
	 * @returns {{__nrForm: string, __ngModelController: string}}
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
			template
			, bindings: this.getComponentBindings()
			, require: this.getComponentRequire()
			, controller: this
		};
	}

	// noinspection DuplicatedCode
	/**
	 *
	 * @ngInject
	 * @param $attrs {angular.IAttributes}
	 * @param $element {JQLite}
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
		this[PRIVATE.useLabel] = !!_.has($attrs, NrAttribute.LABEL);

		/**
		 * The
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

			this[PRIVATE.ngModelController].$render = () => this.onNgModelRender();

		} else if (this[PRIVATE.ngModelController]) {
			this[PRIVATE.ngModelController] = undefined;
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
	 */
	get __ngModel () {
		return this[PRIVATE.ngModel];
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
export default NrTextareaController;
