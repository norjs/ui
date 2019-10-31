import _ from 'lodash';
import NrAttribute from "../../NrAttribute";
import NrTag from "../../NrTag";
import LogUtils from "@norjs/utils/Log";
import angular from "angular";
import NrIconValue from "../../../models/NrIconValue";

// noinspection JSUnusedLocalSymbols
const nrLog = LogUtils.getLogger(NrTag.BUTTON);

/**
 *
 * @enum {Symbol}
 * @readonly
 */
const PRIVATE = {
};

/**
 *
 * FIXME: Implement support for ng-touched
 *
 * @ngInject
 */
export class NrButtonController {

	/**
	 *
	 * @returns {NrTag|string}
	 */
	static get nrName () {
		return NrTag.BUTTON;
	}

	/**
	 *
	 * @returns {typeof NrButtonController}
	 */
	get Class () {
		return NrButtonController;
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
			__type: `@?${NrAttribute.TYPE}`
			, __id: `@?${NrAttribute.ID}`
			, __label: `@?${NrAttribute.LABEL}`
			, __icon: `@?${NrAttribute.ICON}`
			, __click: `&?${NrAttribute.BUTTON_CLICK}`
		};
	}

	/**
	 *
	 * @returns {Object.<string, string>}
	 */
	static getComponentRequire () {
		return {};
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

	/**
	 *
	 * @param $attrs {angular.IAttributes}
	 * @param $element {JQLite}
	 * @param $scope {angular.IScope}
	 * @ngInject
	 */
	constructor ($attrs, $element) {

		/**
		 *
		 * @member {JQLite}
		 */
		this.$element = $element;

		/**
		 *
		 * @member {NrIconValue|string|undefined}
		 * @private
		 */
		this.__type = undefined;

		/**
		 *
		 * @member {string|undefined}
		 * @private
		 */
		this.__id = undefined;

		/**
		 *
		 * @member {string|undefined}
		 * @private
		 */
		this.__label = undefined;

		/**
		 *
		 * @member {string|undefined}
		 * @private
		 */
		this.__icon = undefined;

		/**
		 *
		 * @member {Function|function|undefined}
		 * @private
		 */
		this.__click = undefined;

	}

	/**
	 *
	 * @returns {{top: boolean, left: boolean, bottom: boolean, right: boolean}}
	 */
	getClasses () {
		return {};
	}

	/**
	 *
	 * @param $event
	 * @return {*}
	 */
	onClick ($event) {

		if (_.isFunction(this.__click)) {
			return this.__click({nrButton: this, $event});
		} else {
			nrLog.warn(`No click handler defined.`);
		}

	}

	/**
	 *
	 * @returns {boolean}
	 */
	hasIcon () {
		return this.__icon !== undefined;
	}

	/**
	 *
	 * @returns {NrIconValue|string}
	 */
	get icon () {
		return this.__icon;
	}

	/**
	 *
	 * @returns {string}
	 */
	get label () {
		return this.__label;
	}

}

// noinspection JSUnusedGlobalSymbols
export default NrButtonController;
