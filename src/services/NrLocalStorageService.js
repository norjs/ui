import LogUtils from '@norjs/utils/Log';
import NrServiceName from "../NrServiceName";

const nrLog = LogUtils.getLogger("NrLocalStorageService");

/**
 *
 * @type {{$window: *, getItem: *, getLength: *, getKey: *, setItem: *, removeItem: *, clear: *}}
 * @private
 */
const PRIVATE = {

  /**
   * Symbol for $window object.
   */
  $window: Symbol('$window'),

  /**
   * Symbol for private getItem method.
   */
  getItem: Symbol('getItem'),

  /**
   * Symbol for private getLength method.
   */
  getLength: Symbol('getLength'),

  /**
   * Symbol for private getKey method.
   */
  getKey: Symbol('getKey'),

  /**
   * Symbol for private setItem method.
   */
  setItem: Symbol('setItem'),

  /**
   * Symbol for private removeItem method.
   */
  removeItem: Symbol('removeItem'),

  /**
   * Symbol for private clear method.
   */
  clear: Symbol('clear')

};

/**
 * Service which saves JSON values on browser's LocalStorage API.
 *
 * @see https://www.w3.org/TR/webstorage/
 */
export class NrLocalStorageService {

  /**
   *
   * @returns {NrServiceName|string}
   */
  static get nrName () {
    return NrServiceName.LOCAL_STORAGE;
  }

  /**
   *
   * @returns {typeof NrLocalStorageService}
   */
  get Class () {
    return NrLocalStorageService;
  }

  /**
   *
   * @returns {NrServiceName|string}
   */
  get nrName () {
    return this.Class.nrName;
  }

  /**
   *
   * @param $window {angular.IWindowService}
   * @ngInject
   */
  constructor (
      $window
  ) {
    'ngInject';

    this[PRIVATE.$window] = $window;

  }

  /**
   * Set a value to LocalStorage by a key.
   *
   * @param key {string}
   * @param value {*}
   */
  set (key, value) {
    const stringifiedValue = JSON.stringify(value);
    this[PRIVATE.setItem](key, stringifiedValue);
  }

  /**
   * Get a value from LocalStorage by a key.
   *
   * @param key {string}
   * @returns {*}
   */
  get (key) {
    try {
      return JSON.parse(this[PRIVATE.getItem](key));
    } catch (err) {
      nrLog.error(`Failed to parse (${key}): `, err);
    }
  }

  /**
   * Check if key-value pair exists in LocalStorage.
   *
   * @param key {string}
   * @returns {*}
   */
  has (key) {
    return !!this[PRIVATE.getItem](key);
  }

  /**
   * Clear all key-value pairs.
   *
   */
  clear () {
    this[PRIVATE.clear]();
  }

  /**
   * Returns an array of all keys defined in the localStorage.
   *
   * @returns {Array.<string>}
   */
  getKeys () {
    let length = this[PRIVATE.getLength]();
    let keys = [];
    let i = 0;
    for(; i !== length; i += 1) {
      keys.push(this[PRIVATE.getKey](i));
    }
    return keys;
  }

  /**
   * Get a value from localStorage using a key.
   *
   * @param key {string}
   * @returns {string}
   */
  [PRIVATE.getItem] (key) {
    return this[PRIVATE.$window].localStorage.getItem(key);
  }

  /**
   * Set a value in localStorage.
   *
   * @param key {string}
   * @param value {string}
   */
  [PRIVATE.setItem] (key, value) {
    this[PRIVATE.$window].localStorage.setItem(key, value);
  }

  /**
   * Set a value in localStorage.
   *
   * @param key {string}
   */
  [PRIVATE.removeItem] (key) {
    this[PRIVATE.$window].localStorage.removeItem(key);
  }

  /**
   * Returns the key by the index.
   *
   * @param index {number}
   */
  [PRIVATE.getKey] (index) {
    return this[PRIVATE.$window].localStorage.key(index);
  }

  /**
   * Returns the amount of key-value pairs.
   *
   * @return {number}
   */
  [PRIVATE.getLength] () {
    return this[PRIVATE.$window].localStorage.length;
  }

  /**
   * Clear localStorage data.
   */
  [PRIVATE.clear] () {
    this[PRIVATE.$window].localStorage.clear();
  }

}

export default NrLocalStorageService;
