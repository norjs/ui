import _ from 'lodash';
import {NrInputController} from '../NrInputController.js';

/**
 *
 * @type {{useLabel: Symbol, ngModel: Symbol, innerViewValue: Symbol, focus: Symbol, ngModelController: Symbol}}
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
	 * @returns {{__name: string, __ngModel: string, __type: string, __id: string, __label: string}}
	 */
	static getComponentBindings () {
		return {
			__type: "@?type" // FIXME: This is not used?
			, __id: "@?id" // FIXME: This is not used?
			, __name: "@?name" // FIXME: This is not used?
			, __label: "@?label"
			, __ngModel: "=?ngModel"
		};
	}

	/**
	 *
	 * @returns {{__nrForm: string, __ngModelController: string}}
	 */
	static getComponentRequire () {
		return {
			__nrForm: '?^^nrForm',
			__ngModelController: "?^ngModel"
		};
	}

	/**
	 *
	 * @param template {string}
	 * @returns {{template: string, controller: NrTextareaController, bindings: {__name: string, __ngModel: string, __type: string, __id: string, __label:
	 *     string}, require: {__nrForm: string, __ngModelController: string}}}
	 */
	static getComponentConfig (template) {
		return {
			template
			, bindings: this.getComponentBindings()
			, require: this.getComponentRequire()
			, controller: this
		};
	}

	/**
	 *
	 * @ngInject
	 * @param $attrs {$attrs}
	 * @param $element {$element}
	 */
	constructor ($attrs, $element) {
		super();

		/**
		 *
		 * @member {$element}
		 */
		this.$element = $element;

		this.__type = undefined;
		this.__id = undefined;
		this.__name = undefined;
		this.__label = undefined;

		this.__nrForm = undefined;

		/**
		 * The state for our .useLabel() implementation.
		 *
		 * @member {boolean}
		 */
		this[PRIVATE.useLabel] = !!_.has($attrs, 'label');

		/**
		 * The
		 *
		 * @member {ngModel.NgModelController}
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


	/**
	 * Handles ngModel controller getter for AngularJS required feature.
	 *
	 * @returns {ngModel.ngModelController}
	 * @private
	 */
	get __ngModelController () {
		return this[PRIVATE.ngModelController];
	}

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
	 * Returns true if we already have AngularJS ngModel.NgModelController registered to this component.
	 *
	 * *Note!* This is ***NOT*** the ng-model controller of the child input element which is in the template.
	 *
	 * @returns {boolean}
	 */
	hasNgModelController () {
		return !!this[PRIVATE.ngModelController];
	}

	/**
	 * Returns AngularJS ngModel.NgModelController of this component, if one exists.
	 *
	 * *Note!* This is ***NOT*** the ng-model controller of the child input element in the template.
	 *
	 * @returns {ngModel.NgModelController|undefined}
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


	/**
	 * This is the getter for component attribute binding of the ng-model attribute given to this component.
	 *
	 * AngularJS will call this method from ngModel controller.
	 *
	 */
	get __ngModel () {
		return this[PRIVATE.ngModel];
	}

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
		this.$element.toggleClass('nr-focus', this[PRIVATE.focus]);
	}

}
