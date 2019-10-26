import _ from 'lodash';
import {NrInputController} from '../NrInputController.js';

/**
 *
 * @type {{focus: *}}
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
export class NrMenuController extends NrInputController {

	/**
	 *
	 * @returns {{__getItemId: string, __getList: string, __type: string, __id: string, __itemClick: string, __getItemValue: string, __getItemLabel: string}}
	 */
	static getComponentBindings () {
		return {
			__type: "@?nrType"
			, __id: "@?nrId"
			, __getList: '&?getList'
			, __getItemId: '&?getItemId'
			, __getItemValue: '&?getItemValue'
			, __getItemLabel: '&?getItemLabel'
			, __isItemVisible: '&?isItemVisible'
			, __itemClick: '&?itemClick'
		};
	}

	/**
	 *
	 * @returns {{}}
	 */
	static getComponentRequire () {
		return {};
	}

	/**
	 *
	 * @param template {string}
	 * @returns {{template: string, controller: NrMenuController, bindings: {__getItemId: string, __getList: string, __type: string, __id: string, __itemClick:
	 *     string, __getItemValue: string, __getItemLabel: string}, require: {}}}
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
	constructor ($attrs, $element, $scope) {
		super();

		this.$element = $element;
		this.$scope = $scope;

		/**
		 *
		 * @type {string}
		 * @private
		 */
		this.__type = undefined;

		this.__id = undefined;
		this.__getList = undefined;
		this.__getItemId = undefined;
		this.__getItemValue = undefined;
		this.__getItemLabel = undefined;
		this.__isItemVisible = undefined;
		this.__itemClick = undefined;

		/**
		 *
		 * @type {boolean}
		 * @private
		 */
		this[PRIVATE.open] = false;

		/**
		 * If `true`, this controller has focus.
		 *
		 * @type {boolean}
		 */
		this[PRIVATE.focus] = false;

		this.filterFunc = (item, index, array) => this.isItemVisible(item, this.getItemValue(item));

	}

	$postLink () {
		this._updatePosition();
	}

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
		this.$element.toggleClass('nr-focus', this[PRIVATE.focus]);
	}


	/**
	 *
	 * @returns {string}
	 */
	get type () {
		return this.__type ? this.__type : 'bars';
	}

}
