import _ from 'lodash';

/**
 * This service provides helper functions to compile elements dynamically.
 */
export class NrCompileUtils {

  static get nrName () {
    return "NrCompileUtils";
  }

  get Class () {
    return NrCompileUtils;
  }

  get nrName () {
    return this.Class.nrName;
  }

  /**
   *
   * @ngInject
   * @private
   */
  constructor () {}

  /**
   * Encode expression from a parsed diverse variable (eg. from JSON) format in to a string.
   *
   * For example if it is an array, will convert it like `["foo", "bar"]` ==> `"foobar"`.
   *
   * Anything except a string will be converted to JSON and returned as such.
   *
   * @param expression {*}
   * @return {string}
   */
  static stringifyExpression (expression) {

    if (_.isString(expression)) {
      return expression;
    }

    if (_.isArray(expression)) {
      return _.map(
          expression,
          part => _.isString(part) ? part : JSON.stringify(part)
      ).join('');
    }

    return JSON.stringify(expression);

  }

}

// noinspection JSUnusedGlobalSymbols
export default NrCompileUtils;
