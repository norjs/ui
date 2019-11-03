import LogUtils from "@norjs/utils/Log";

// noinspection JSUnusedLocalSymbols
const nrLog = LogUtils.getLogger( "NrInputController" );

/**
 *
 * @abstract
 */
export class NrInputController {

	/**
	 * @returns {string}
	 * @abstract
	 */
	static get nrName () {}

	/**
	 * @returns {string}
	 * @abstract
	 */
	get nrName () {}

	/**
	 *
	 * @returns {string}
	 */
	toString () {
		return `${this.nrName}[name=${LogUtils.getAsString(this.getName())}]`;
	}

	/**
	 * This will be used from the template.
	 *
	 * Defaults to `true`. You can override this.
	 *
	 * @returns {boolean}
	 */
	useLabel () {
		return true;
	}

	/**
	 * Returns the label for this field. It can be a translation tag.
	 *
	 * @abstract
	 */
	getLabel () {}

	/**
	 * Returns the name of the form field.
	 *
	 * This is also used as the keyword path to the payload in form's payload object.
	 *
	 * @returns {string|undefined}
	 * @abstract
	 */
	getName () {}

	/**
	 * @returns {boolean}
	 * @abstract
	 */
	hasIconValue () {}

	/**
	 * @returns {string}
	 * @abstract
	 */
	getIconValue () {}

	/**
	 *
	 * @abstract
	 * @returns {string}
	 */
	getViewValue () {}

	/**
	 *
	 * @param value {string}
	 * @param trigger {string} Event that triggered the update.
	 * @abstract
	 */
	setViewValue (value, trigger) {}

	/**
	 * @abstract
	 */
	onNgModelRender () {}

	/**
	 * Sets NgModelController
	 *
	 * See also nrRegisterNgModelDirective
	 *
	 * @param controller {ngModel.ngModelController}
	 * @abstract
	 */
	setNgModelController (controller) {}

	/**
	 * Returns true if we already have AngularJS angular.INgModelController registered.
	 *
	 * @returns {boolean}
	 * @abstract
	 */
	hasNgModelController () {}

	/**
	 * Returns AngularJS angular.INgModelController of this element, if one exists.
	 *
	 * @returns {angular.INgModelController|undefined}
	 * @abstract
	 */
	getNgModelController () {}

	/**
	 *
	 * @returns {*|undefined}
	 */
	getModelValue () {

		const ngModelController = this.getNgModelController();

		if (!ngModelController) {
			nrLog.warn(`${this.nrName}.getModelValue(): No ngModelController detected.`);
			return undefined;

		}

		return ngModelController.$modelValue;

	}

	/**
	 *
	 * @param $element {JQLite}
	 * @param name {NrStyleClass}
	 * @param value {boolean}
	 */
	static toggleClass ($element, name, value) {

		if ($element) {
			$element.toggleClass(name, value);
		} else {
			nrLog.warn(`${this.nrName}: Warning: No $element detected`);
		}

	}

}

// noinspection JSUnusedGlobalSymbols
export default NrInputController;
