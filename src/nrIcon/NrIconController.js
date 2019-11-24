import _ from 'lodash';
import NrTag from "../NrTag";

const PRIVATE = {
  type: Symbol('_type')
  , types: Symbol('_types')
};

/**
 *
 */
class NrIconController {

  static get nrName () {
    return NrTag.ICON;
  }

  get Class () {
    return NrIconController;
  }

  get nrName () {
    return this.Class.nrName;
  }

  static get $inject () {
    if (this._inject) return this._inject;
    return [];
  }
  static set $inject (value) {
    this._inject = value;
  }

  /**
   *
   * @ngInject
   */
  constructor () {
    'ngInject';
  }

  /**
   *
   * @returns {*}
   */
  getClasses () {

    if (!this[PRIVATE.types]) {
      return {};
    }

    return _.reduce(
      this[PRIVATE.types],
      (obj, key) => {
        obj[ `fa-${key}` ] = true;
        return obj;
      },
      {fa: true}
    );

  }

  /**
   *
   * @returns {*}
   * @private
   */
  get __type () {
    return this[PRIVATE.type];
  }

  /**
   *
   * @param value
   * @private
   */
  set __type (value) {
    this[PRIVATE.type] = value;
    this[PRIVATE.types] = value ? _.split(''+value, ' ') : [];
  }

}

export default NrIconController;
