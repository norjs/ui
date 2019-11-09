import _ from 'lodash';
import NrTag from "../NrTag";
import LogUtils from "@norjs/utils/Log";
import NrModelUtils from "../../utils/NrModelUtils";
import NrNav from "../../models/views/NrNav";
import NrEventName from "../../models/NrEventName";

// noinspection JSUnusedLocalSymbols
const nrLog = LogUtils.getLogger(NrTag.NAV);

/**
 * You can configure `nr-nav` to use any type of item using this configuration object.
 *
 * Example: `<nr-nav nr-options="$ctrl.navOptions"></nr-nav>`
 *
 * The difference for using `nr-model` attribute and `NrNav` is that the model style doesn't allow function
 * based custom configurations.
 *
 * @typedef {Object} NrNavOptionsObject
 * @property [getCollection] {function: Array.<T>}
 * @property [collection] {Array.<T>}
 * @property [getId] {function(T): string}
 * @property [onClick] {function(T)}
 * @property [getHref] {function(T): string}
 * @property [hasIcon] {function(T): boolean}
 * @property [getIcon] {function(T): string} This should return the type of nr-icon
 * @property [getLabel] {function(T): string}
 * @property [isSelected] {function(T): boolean}
 * @property [isVisible] {function(T): boolean}
 * @template T
 */

/**
 *
 * @ngInject
 */
class NrNavController {

  /**
   *
   * @returns {NrTag|string}
   */
  static get nrName () {
    return NrTag.NAV;
  }

  /**
   *
   * @returns {typeof NrNavController}
   */
  get Class () {
    return NrNavController;
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
   * @param $scope {angular.IScope}
   * @ngInject
   */
  constructor ($scope) {

    /**
     *
     * @member {angular.IScope}
     * @private
     */
    this._$scope = $scope;

    /**
     *
     * @member {Array}
     * @private
     */
    this._collection = undefined;

    /**
     *
     * @member {NrNavOptionsObject}
     * @private
     */
    this._options = undefined;

    /**
     *
     * @member {NrNav|undefined}
     * @private
     */
    this._nrModel = undefined;

  }

  // noinspection JSUnusedGlobalSymbols
  /**
   *
   * @returns {NrNavOptionsObject|undefined}
   */
  get bindOptions () {
    return this._options;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   *
   * @param value {NrNavOptionsObject|undefined}
   */
  set bindOptions (value) {

    if (value !== this._options) {
      this._options = value;
      nrLog.trace(`${this.nrName}[set bindOptions]: options set as: `, this._options);
    }

  }

  // noinspection JSUnusedGlobalSymbols
  /**
   *
   * @returns {Array|undefined}
   */
  get bindCollection () {
    return this._collection;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   *
   * @param value {Array|undefined}
   */
  set bindCollection (value) {

    if (value !== this._collection) {
      this._collection = value;
      nrLog.trace(`${this.nrName}[set bindCollection]: collection set as: `, this._collection);
    }

  }

  /**
   *
   * @returns {NrNav|undefined}
   */
  get bindNrModel () {
    return this._nrModel;
  }

  /**
   *
   * @param value {NrNav|undefined}
   */
  set bindNrModel (value) {

    if (value !== this._nrModel) {
      this._nrModel = value;
      nrLog.trace(`${this.nrName}[set bindNrModel]: nrModel set as: `, this._nrModel);
    }

  }

  getCollection () {

    if (this._collection) return this._collection;

    if (this._options && this._options.getCollection) {
      return this._options.getCollection();
    }

    if (this._options && _.isArray(this._options.collection)) {
      return this._options.collection;
    }

    if ( this._nrModel && this._nrModel.content ) {
      return this._nrModel.content;
    }

    return undefined;

  }

  getId (item) {

    if (this._options && this._options.getId) {
      return this._options.getId(item);
    }

    if (NrModelUtils.isModel(item)) {
      return NrModelUtils.getModelId(item);
    }

    return item.id;

  }

  getHref (item) {

    if (this._options && this._options.getHref) {
      return this._options.getHref(item);
    }

    if ( NrModelUtils.isModel(item)) {
      return NrModelUtils.getModelHref(item);
    }

    return undefined;

  }

  hasIcon (item) {

    if (this._options && this._options.hasIcon) {
      return this._options.hasIcon(item);
    }

    if ( NrModelUtils.isModel(item) && NrModelUtils.getModelIconValue(item) ) {
      return true;
    }

    return !!this.getIcon(item);

  }

  getIcon (item) {

    if (this._options && this._options.getIcon) {
      return this._options.getIcon(item);
    }

    if ( NrModelUtils.isModel(item) && NrModelUtils.getModelIcon(item) ) {
      return NrModelUtils.getModelIconValue(item);
    }

    return item.icon;

  }

  /**
   *
   * @param item {*}
   */
  onClick (item) {

    if (this._options && this._options.onClick) {
      return this._options.onClick(item);
    }

    // FIXME: implement support for nrModel.action and/or item if it is NrRequest

    this._$scope.emit(NrEventName.NAV_CLICK, item);

    nrLog.warn(`.onClick(): No click action configured`);

  }

  getLabel (item) {

    if (this._options && this._options.getLabel) {
      return this._options.getLabel(item);
    }

    if ( NrModelUtils.isModel(item) && item.label ) {
      return NrModelUtils.getModelLabel(item);
    }

    return item.label;

  }

  isSelected (item) {

    if (this._options && this._options.isSelected) {
      return this._options.isSelected(item);
    }

    // return this.isState(this.getId(item));

    return false;

  }

  isVisible (item) {

    if (this._options && this._options.isVisible) {
      return this._options.isVisible(item);
    }

    return !!item;

  }

  // /**
  //  * Returns current state name
  //  *
  //  * @returns {*}
  //  */
  // getCurrentStateName () {
  //   return _.get(this.$state, 'current.name');
  // }
  //
  // /**
  //  * Check if we are at the moment in state named `name`
  //  *
  //  * @param name
  //  * @returns {boolean}
  //  */
  // isState (name) {
  //   return this.getCurrentStateName() === name;
  // }

  /**
   * Returns `true` if navigation items go from up to down.
   *
   * @returns {boolean}
   */
  isVerticalNav () {
    return this._nrModel ? this._nrModel.style === NrNav.Style.VERTICAL : true;
  }

  /**
   * Returns `true` if navigation items go from left to right.
   *
   * @returns {boolean}
   */
  isHorizontalNav () {
    return this._nrModel ? this._nrModel.style === NrNav.Style.HORIZONTAL : false;
  }

  /**
   * These are styles for the 'ul' element
   */
  getListStyles () {
    return {
      vertical: this.isVerticalNav()
      , horizontal: this.isHorizontalNav()
    };
  }

}

export default NrNavController;
