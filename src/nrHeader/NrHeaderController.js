import _ from 'lodash';
import NrTag from "../NrTag";

const PRIVATE = {
  nrModel: Symbol('_nrModel')
};

/**
 *
 */
class NrHeaderController {

  static get nrName () {
    return NrTag.HEADER;
  }

  get Class () {
    return NrHeaderController;
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
     * @member {NrHeader|undefined}
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
   * @returns {NrHeader}
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
   * @returns {string|undefined}
   */
  get className () {
    return this.nrModel ? this.nrModel.className : undefined;
  }

  /**
   *
   * @returns {NrImage|NrIcon|undefined}
   */
  get logo () {
    return this.nrModel ? this.nrModel.logo : undefined;
  }

  /**
   *
   * @returns {string|undefined}
   */
  get title () {
    return this.nrModel ? this.nrModel.title : undefined;
  }

  /**
   *
   * @returns {NrHeader}
   * @private
   */
  get bindNrModel () {

    return this[PRIVATE.nrModel];

  }

  /**
   *
   * @param value {NrHeader|undefined}
   * @private
   */
  set bindNrModel (value) {

    this[PRIVATE.nrModel] = value;

  }

}

export default NrHeaderController;
