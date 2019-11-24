import _ from 'lodash';
import NrAttribute from "../../NrAttribute";
import NrTag from "../../NrTag";
import LogUtils from "@norjs/utils/Log";
import angular from "angular";
import NrStyleClass from "../../NrStyleClass";
import NrIconValue from "../../../models/NrIconValue";

// noinspection JSUnusedLocalSymbols
const nrLog = LogUtils.getLogger(NrTag.MENU);

/**
 *
 * @enum {Symbol}
 * @readonly
 */
const PRIVATE = {
	open: Symbol('_open'),
	focus: Symbol('_focus')
};

/**
 *
 * FIXME: Implement support for ng-touched
 *
 * @ngInject
 */
export class NrMenuController {

	/**
	 *
	 * @returns {NrTag|string}
	 */
	static get nrName () {
		return NrTag.MENU;
	}

	/**
	 *
	 * @returns {typeof NrMenuController}
	 */
	get Class () {
		return NrMenuController;
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
			, __getList: `&?${NrAttribute.MENU_GET_LIST}`
			, __getItemId: `&?${NrAttribute.MENU_GET_ITEM_ID}`
			, __getItemValue: `&?${NrAttribute.MENU_GET_ITEM_VALUE}`
			, __getItemLabel: `&?${NrAttribute.MENU_GET_ITEM_LABEL}`
			, __isItemVisible: `&?${NrAttribute.MENU_IS_ITEM_VISIBLE}`
			, __itemClick: `&?${NrAttribute.MENU_ITEM_CLICK}`
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
		return ["$attrs", "$element", "$scope"];
	}
	static set $inject (value) {
		this._inject = value;
	}

	/**
	 *
	 * @param $attrs {angular.IAttributes}
	 * @param $element {JQLite}
	 * @param $scope {angular.IScope}
	 * @ngInject
	 */
	constructor ($attrs, $element, $scope) {

		/**
		 *
		 * @member {JQLite}
		 */
		this.$element = $element;

		/**
		 *
		 * @member {angular.IScope}
		 */
		this.$scope = $scope;

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
		 * @member {Function|function|undefined}
		 * @private
		 */
		this.__getList = undefined;

		/**
		 *
		 * @member {Function|function|undefined}
		 * @private
		 */
		this.__getItemId = undefined;

		/**
		 *
		 * @member {Function|function|undefined}
		 * @private
		 */
		this.__getItemValue = undefined;

		/**
		 *
		 * @member {Function|function|undefined}
		 * @private
		 */
		this.__getItemLabel = undefined;

		/**
		 *
		 * @member {Function|function|undefined}
		 * @private
		 */
		this.__isItemVisible = undefined;

		/**
		 *
		 * @member {Function|function|undefined}
		 * @private
		 */
		this.__itemClick = undefined;

		/**
		 *
		 * @member {boolean}
		 * @private
		 */
		this[PRIVATE.open] = false;

		/**
		 * If `true`, this controller has focus.
		 *
		 * @member {boolean}
		 */
		this[PRIVATE.focus] = false;

		// noinspection JSUnusedLocalSymbols
		/**
		 *
		 * @param item {*}
		 * @param index {number}
		 * @param array {Array}
		 * @returns {boolean}
		 */
		this.filterFunc = (item, index, array) => this.isItemVisible(item, this.getItemValue(item));

	}

	$postLink () {

		this._updatePosition();

	}

	// noinspection JSUnusedGlobalSymbols
	$doCheck () {

		if (!angular.equals(this._position, this._getPosition())) {
			this.$scope.$evalAsync(() => this._updatePosition());
		}

	}

	/**
	 *
	 * @returns {{offsetTop: number|undefined, offsetLeft: number|undefined}}
	 * @private
	 */
	_getElementDimensions () {

		const element = this.$element[0];
		const offsetLeft = element ? element.offsetLeft : undefined;
		const offsetTop = element ? element.offsetTop : undefined;

		return {offsetLeft, offsetTop};

	}

	/**
	 *
	 * @returns {{clientWidth: number, clientHeight: number}}
	 * @private
	 */
	_getClientDimensions () {
		const documentElem = (document.compatMode === "CSS1Compat") ?
			document.documentElement :
			document.body;
		const clientWidth = documentElem.clientWidth;
		const clientHeight = documentElem.clientHeight;
		return {clientWidth, clientHeight};
	}

	/**
	 *
	 * @returns {{offsetTop: number, clientWidth: number, offsetLeft: number, clientHeight: number}}
	 * @private
	 */
	_getDimensions () {
		const {offsetLeft, offsetTop} = this._getElementDimensions();
		const {clientWidth, clientHeight} = this._getClientDimensions();
		return {offsetLeft, offsetTop, clientWidth, clientHeight};
	}

	/**
	 *
	 * @returns {{isRight: boolean, isBottom: boolean}}
	 * @private
	 */
	_getPosition () {
		const {
			offsetLeft, offsetTop, clientWidth, clientHeight
		} = this._getDimensions();
		const isRight = !!Math.round(offsetLeft / clientWidth );
		const isBottom = !Math.round(offsetTop / clientHeight );
		return {isRight, isBottom};
	}

	/**
	 *
	 * @private
	 */
	_updatePosition () {
		this._position = this._getPosition();
	}

	/**
	 *
	 * @returns {{top: boolean, left: boolean, bottom: boolean, right: boolean}}
	 */
	getClasses () {
		return {
			active: this.isMenuOpen(),
			right: this._position.isRight,
			left: !this._position.isRight,
			bottom: this._position.isBottom,
			top: !this._position.isBottom
		};
	}

	/**
	 *
	 * @returns {Array.<*>}
	 */
	getList () {
		if (_.isFunction(this.__getList)) {
			return this.__getList({nrMenu: this});
		}
		return [];
	}

	/**
	 *
	 * @param item
	 * @returns {*}
	 */
	getItemId (item) {
		if (_.isFunction(this.__getItemId)) {
			return this.__getItemId({nrMenu: this, item});
		}
		if (_.isFunction(this.__getItemValue)) {
			return this.__getItemValue({nrMenu: this, item});
		}
		return item;
	}

	/**
	 *
	 * @param item
	 * @returns {*}
	 */
	getItemValue (item) {
		if (_.isFunction(this.__getItemValue)) {
			return this.__getItemValue({nrMenu: this, item});
		}
		return item;
	}

	/**
	 *
	 * @param item
	 * @returns {boolean}
	 * @param value
	 */
	isItemVisible (item, value) {
		if (_.isFunction(this.__isItemVisible)) {
			return !!this.__isItemVisible({nrMenu: this, item, value});
		}
		return true;
	}

	/**
	 *
	 * @param item
	 * @returns {*}
	 */
	getItemLabel (item) {
		if (_.isFunction(this.__getItemLabel)) {
			return this.__getItemLabel({nrMenu: this, item});
		}
		return this.getItemId(item);
	}

	/**
	 *
	 * @param item {*}
	 * @returns {boolean}
	 */
	isItemSelected (item) {
		return false;
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
	 * @param $event
	 * @param item
	 * @param value
	 * @return {*}
	 */
	onClick ($event, item, value) {
		let result;
		if (_.isFunction(this.__itemClick)) {
			result = this.__itemClick({nrMenu: this, $event, item, value});
		}
		this.toggleMenuState();
		return result;
	}

	/**
	 * Return true if menu is open.
	 *
	 * @returns {boolean}
	 */
	isMenuOpen () {
		return this[PRIVATE.open];
	}

	/**
	 * Open or close menu.
	 */
	toggleMenuState () {
		this[PRIVATE.open] = !this[PRIVATE.open];
		if (this[PRIVATE.open]) {
			this._updatePosition();
		}
	}

	/**
	 *
	 * @param $event
	 */
	closeMenu ($event) {
		this[PRIVATE.open] = false;
	}

	/**
	 *
	 * @private
	 */
	_updateFocusStyles () {

		this.Class.toggleClass(this.$element, NrStyleClass.FOCUS, this[PRIVATE.focus]);

	}

	/**
	 *
	 * @returns {NrIconValue|string}
	 */
	get type () {
		return this.__type ? this.__type : NrIconValue.BARS;
	}

}

// noinspection JSUnusedGlobalSymbols
export default NrMenuController;
