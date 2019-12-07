import _ from 'lodash';
import NrTag from "../NrTag";

const PRIVATE = {
  nrModel: Symbol('_nrModel')
};

/**
 *
 */
class NrImageController {

  static get nrName () {
    return NrTag.IMAGE;
  }

  get Class () {
    return NrImageController;
  }

  get nrName () {
    return this.Class.nrName;
  }

  /**
   *
   * @ngInject
   */
  constructor () {
    'ngInject';

    /**
     *
     * @member {NrImage|undefined}
     * @private
     */
    this[PRIVATE.nrModel] = undefined;

  }

  /**
   *
   * @returns {*}
   */
  getClasses () {

    const className = this.nrName.className;

    if (_.isString(className)) {
      return {[className]: true};
    }

    return _.reduce(className, (obj, name) => {
      obj[name] = true;
    }, {});

  }

  /**
   *
   * @returns {NrImage}
   */
  get nrModel () {
    return this[PRIVATE.nrModel];
  }

  /**
   *
   * @returns {string|undefined}
   */
  get id () {
    return this.nrModel ? this.nrModel.id : undefined;
  }

  /**
   *
   * @returns {string|Array<string>|undefined}
   */
  get className () {
    return this.nrModel ? this.nrModel.className : undefined;
  }

  /**
   *
   * @returns {string|undefined}
   */
  get src () {
    return this.nrModel ? this.nrModel.src : undefined;
  }

  /**
   *
   * @returns {string|undefined}
   */
  get alt () {
    return this.nrModel ? this.nrModel.alt : undefined;
  }

  /**
   *
   * @returns {NrImage}
   * @private
   */
  get bindNrModel () {

    return this[PRIVATE.nrModel];

  }

  /**
   *
   * @param value {NrImage|undefined}
   * @private
   */
  set bindNrModel (value) {

    this[PRIVATE.nrModel] = value;

  }

}

export default NrImageController;
