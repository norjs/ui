
/**
 *
 * @abstract
 */
export class NrInputController {

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
	 * Returns true if we already have AngularJS ngModel.NgModelController registered.
	 *
	 * @returns {boolean}
	 * @abstract
	 */
	hasNgModelController () {}

	/**
	 * Returns AngularJS ngModel.NgModelController of this element, if one exists.
	 *
	 * @returns {ngModel.NgModelController|undefined}
	 * @abstract
	 */
	getNgModelController () {}



}
