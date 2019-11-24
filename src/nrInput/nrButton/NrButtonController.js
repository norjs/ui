import _ from 'lodash';
import NrAttribute from "../../NrAttribute";
import NrTag from "../../NrTag";
import LogUtils from "@norjs/utils/Log";
import angular from "angular";
import NrIconValue from "../../../models/NrIconValue";
import NrEventName from "../../../models/NrEventName";
import NrButton from "../../../models/views/NrButton";

// noinspection JSUnusedLocalSymbols
const nrLog = LogUtils.getLogger(NrTag.BUTTON);

/**
 *
 * FIXME: Implement support for ng-touched
 *
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
			bindType: `@?${NrAttribute.TYPE}`
			, __style: `@?${NrAttribute.STYLE}`
			, __id: `@?${NrAttribute.ID}`
			, __name: `@?${NrAttribute.NAME}`
			, __label: `@?${NrAttribute.LABEL}`
			, __icon: `@?${NrAttribute.ICON}`
			, __click: `&?${NrAttribute.BUTTON_CLICK}`
			, __enabled: `&?${NrAttribute.ENABLED}`
			, __nrModel: `<?${NrAttribute.MODEL}`
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

	static get $inject () {
		if (this._inject) return this._inject;
		return ["$scope", "$attrs"];
	}
	static set $inject (value) {
		this._inject = value;
	}

	/**
	 *
	 * @param $scope {angular.IScope}
	 * @param $attrs {angular.IAttributes}
	 * @ngInject
	 */
	constructor ($scope, $attrs) {
		'ngInject';

		/**
		 *
		 * @member {boolean}
		 * @private
		 */
		this._hasTypeAttribute = !!$attrs[NrAttribute.TYPE];

		/**
		 *
		 * @member {boolean}
		 * @private
		 */
		this._hasStyleAttribute = !!$attrs[NrAttribute.STYLE];

		/**
		 *
		 * @member {boolean}
		 * @private
		 */
		this._hasIdAttribute = !!$attrs[NrAttribute.ID];

		/**
		 *
		 * @member {boolean}
		 * @private
		 */
		this._hasNameAttribute = !!$attrs[NrAttribute.NAME];

		/**
		 *
		 * @member {boolean}
		 * @private
		 */
		this._hasLabelAttribute = !!$attrs[NrAttribute.LABEL];

		/**
		 *
		 * @member {boolean}
		 * @private
		 */
		this._hasIconAttribute = !!$attrs[NrAttribute.ICON];

		/**
		 *
		 * @member {boolean}
		 * @private
		 */
		this._hasClickAttribute = !!$attrs[NrAttribute.BUTTON_CLICK];

		/**
		 *
		 * @member {boolean}
		 * @private
		 */
		this._hasEnabledAttribute = !!$attrs[NrAttribute.ENABLED];

		/**
		 *
		 * @member {angular.IScope}
		 * @private
		 */
		this._$scope = $scope;

		/**
		 *
		 * @member {NrIconValue|string|undefined}
		 * @private
		 */
		this.__style = undefined;

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
		this.__name = undefined;

		/**
		 *
		 * @member {boolean|undefined}
		 * @private
		 */
		this.__enabled = undefined;

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

		/**
		 * Optional button model
		 * @member {NrButton|undefined}
		 * @private
		 */
		this.__nrModel = undefined;

	}

	/**
	 *
	 * @returns {Object}
	 */
	getClasses () {
		return {
			"nr-icon": this.style === NrButton.Style.ICON,
			"nr-submit": this.style === NrButton.Style.SUBMIT,
			"nr-cancel": this.style === NrButton.Style.CANCEL,
			"nr-default": this.style === NrButton.Style.DEFAULT,
			"nr-accept": this.style === NrButton.Style.ACCEPT,
			"nr-disabled": !this.enabled
		};
	}

	/**
	 *
	 * @param $event
	 * @return {*}
	 */
	onClick ($event) {

		if ( this._hasClickAttribute && _.isFunction(this.__click)) {

			nrLog.trace(`.onClick(): Using nr-click attribute`);

			return this.__click({nrButton: this, $event});

		} else {

			this._$scope.$emit(NrEventName.BUTTON_CLICK, this);

			nrLog.trace(`.onClick(): No click action configured; emitted an event BUTTON_CLICK "${NrEventName.BUTTON_CLICK}"`);

		}

	}

	/**
	 *
	 * @returns {boolean}
	 */
	hasIcon () {

		if (this._hasIconAttribute) {
			return this.__icon !== undefined;
		}

		return _.has(this.__nrModel, 'icon.value') !== undefined;

	}

	/**
	 *
	 * @returns {NrButton|undefined}
	 */
	get nrModel () {
		return this.__nrModel;
	}

	/**
	 *
	 * Use `.nrModel`
	 *
	 * @returns {NrButton|undefined}
	 * @deprecated
	 */
	get model () {
		return this.__nrModel;
	}

	/**
	 *
	 * @returns {boolean}
	 */
	get enabled () {
		if (this._hasEnabledAttribute) {
			return this.__enabled !== false;
		} else {
			return _.get(this.__nrModel, 'enabled') !== false;
		}
	}

	/**
	 *
	 * @returns {string}
	 */
	get style () {
		if (this._hasStyleAttribute) {
			return this.__style;
		} else {
			return _.get(this.__nrModel, 'style');
		}
	}

	/**
	 *
	 * **DEPRECATED:** Use `$ctrl.style` instead.
	 *
	 * @returns {string}
	 * @deprecated
	 */
	get type () {
		return this.style;
	}

	/**
	 *
	 * @returns {string}
	 */
	get name () {
		if (this._hasNameAttribute) {
			return this.__name;
		} else {
			return _.get(this.__nrModel, 'name');
		}
	}

	/**
	 *
	 * @returns {string}
	 */
	get id () {
		if (this._hasIdAttribute) {
			return this.__id;
		} else {
			return _.get(this.__nrModel, 'id');
		}
	}

	/**
	 *
	 * @returns {NrIconValue|string}
	 */
	get icon () {
		if (this._hasIconAttribute) {
			return this.__icon;
		} else {
			return _.get(this.__nrModel, 'icon.value');
		}
	}

	/**
	 *
	 * @returns {string}
	 */
	get label () {
		if (this._hasLabelAttribute) {
			return this.__label;
		} else {
			return _.get(this.__nrModel, 'label');
		}
	}

	/**
	 *
	 * @returns {string}
	 */
	get bindType () {

		return this.__style;

	}

	/**
	 *
	 * @param value {string}
	 */
	set bindType (value) {

		if (this.__style !== value) {

			this.__style = value;

		}

	}

	$onInit () {

		if (this._hasTypeAttribute) {

			nrLog.warn(`Warning! nr-type attribute for nr-button component is obsolete. Use nr-style instead.`);

		}

	}

}

// noinspection JSUnusedGlobalSymbols
export default NrButtonController;
