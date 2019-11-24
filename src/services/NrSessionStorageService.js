import LogUtils from "@norjs/utils/Log";
import NrServiceName from "../NrServiceName";

const nrLog = LogUtils.getLogger("NrSessionStorageService");

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
 * Service which saves JSON values on browser's SessionStorage API.
 *
 * @see https://www.w3.org/TR/webstorage/
 */
export class NrSessionStorageService {

  /**
   *
   * @returns {NrServiceName|string}
   */
  static get nrName () {
    return NrServiceName.SESSION_STORAGE;
  }

  /**
   *
   * @returns {typeof NrLocalStorageService}
   */
  get Class () {
    return NrSessionStorageService;
  }

  /**
   *
   * @returns {NrServiceName|string}
   */
  get nrName () {
    return this.Class.nrName;
  }

  static get $inject () {
    if (this._inject) return this._inject;
    return ["$window"];
  }
  static set $inject (value) {
    this._inject = value;
  }

  /**
   *
   * @param $window {$window}
   * @ngInject
   */
  constructor (
      $window
  ) {

    this[PRIVATE.$window] = $window;

  }

  /**
   * Set a value to SessionStorage by a key.
   *
   * @param key {string}
   * @param value {*}
   */
  set (key, value) {

    const stringifiedValue = JSON.stringify(value);

    this[PRIVATE.setItem](key, stringifiedValue);

  }

  /**
   * Get a value from SessionStorage by a key.
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
   * Check if key-value pair exists in SessionStorage.
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
   * Returns an array of all keys defined in the sessionStorage.
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
   * Get a value from sessionStorage using a key.
   *
   * @param key {string}
   * @returns {string}
   */
  [PRIVATE.getItem] (key) {
    return this[PRIVATE.$window].sessionStorage.getItem(key);
  }

  /**
   * Set a value in sessionStorage.
   *
   * @param key {string}
   * @param value {string}
   */
  [PRIVATE.setItem] (key, value) {
    this[PRIVATE.$window].sessionStorage.setItem(key, value);
  }

  /**
   * Set a value in sessionStorage.
   *
   * @param key {string}
   */
  [PRIVATE.removeItem] (key) {
    this[PRIVATE.$window].sessionStorage.removeItem(key);
  }

  /**
   * Returns the key by the index.
   *
   * @param index {number}
   */
  [PRIVATE.getKey] (index) {
    return this[PRIVATE.$window].sessionStorage.key(index);
  }

  /**
   * Returns the amount of key-value pairs.
   *
   * @return {number}
   */
  [PRIVATE.getLength] () {
    return this[PRIVATE.$window].sessionStorage.length;
  }

  /**
   * Clear sessionStorage data.
   */
  [PRIVATE.clear] () {
    this[PRIVATE.$window].sessionStorage.clear();
  }

}

// noinspection JSUnusedGlobalSymbols
export default NrSessionStorageService;
