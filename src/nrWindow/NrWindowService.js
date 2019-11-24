import _ from 'lodash';
import angular from "angular";

/**
 *
 * @enum {Symbol}
 * @readonly
 */
const PRIVATE = {
  $compile: Symbol('$compile'),
  $document: Symbol('$document'),
  $rootScope: Symbol('$rootScope'),
  windows: Symbol('_windows'),
  zIndexBase: Symbol('_zIndexBase'),
  updateZIndexes: Symbol('_updateZIndexes'),
  moveToFront: Symbol('_moveToFront')
};

/**
 */
export class NrWindowService {

  /**
   *
   * @returns {NrServiceName|string}
   */
  static get nrName () {
    return NrServiceName.WINDOW;
  }

  /**
   *
   * @returns {typeof NrWindowService}
   */
  get Class () {
    return NrWindowService;
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
    return ["$compile", "$document", "$rootScope"];
  }
  static set $inject (value) {
    this._inject = value;
  }

  /**
   *
   * @param $compile {angular.ICompileService}
   * @param $document {angular.IDocumentService}
   * @param $rootScope {angular.IRootScopeService}
   * @ngInject
   */
  constructor (
      $compile,
      $document,
      $rootScope
  ) {
    'ngInject';

    /**
     *
     * @member {angular.ICompileService}
     * @private
     */
    this[PRIVATE.$compile] = $compile;

    /**
     *
     * @member {angular.IDocumentService}
     * @private
     */
    this[PRIVATE.$document] = $document;

    /**
     *
     * @member {angular.IRootScopeService}
     * @private
     */
    this[PRIVATE.$rootScope] = $rootScope;

    /**
     *
     * @type {Array.<WindowController>}
     * @private
     */
    this[PRIVATE.windows] = [];

    /**
     * The base for nrWindow z indexes.
     *
     * @type {number}
     * @private
     */
    this[PRIVATE.zIndexBase] = 10000;

  }

  /**
   *
   * @param window {WindowController}
   * @return {{width: number, height: number}}
   */
  register (window) {

    console.log(`${this.nrName}: Registering a window: `, window);

    const previousWindow = this[PRIVATE.windows].length ? this[PRIVATE.windows][this[PRIVATE.windows].length -1] : undefined;

    this[PRIVATE.windows].push(window);

    if (previousWindow) {
      const previousWindowPlacement = previousWindow.getWindowPlacement();
      window.setWindowPosition(previousWindowPlacement.x + 20, previousWindowPlacement.y + 20);
    }

    window.setZIndex(this[PRIVATE.zIndexBase] + this[PRIVATE.windows].length - 1);

    return {
      width: 300,
      height: 200
    };
  }

  /**
   *
   * @param window {WindowController}
   */
  unregister (window) {

    console.log(`${this.nrName}: Unregistering a window: `, window);

    _.remove(this[PRIVATE.windows], w => w === window);

  }

  /**
   * Create a new nr-nrWindow element with nr-nrCompile inside it and place it on the document body.
   *
   * @param title {string}
   * @param component {string}
   * @param resolve {object}
   */
  createWindow ({title, component, resolve}) {

    let element;

    const scope = this[PRIVATE.$rootScope].$new();

    // noinspection JSUnusedGlobalSymbols
    scope.window = {
      title,
      onClose: () => {
        scope.$destroy();
        element.remove();
      },
      options: {
        component,
        resolve
      }
    };

    // FIXME: These nr-attributes should be converted from `NrAttribute`
    const html = `<nr-window 
        nr-title="{{::window.title}}" 
        nr-close="window.onClose()"
        ><nr-compile nr-options="window.options"></nr-compile></nr-window>`;
    const template = angular.element(html);
    const linkFn = this[PRIVATE.$compile](template);
    element = linkFn(scope);
    this[PRIVATE.$document].find('body')[0].appendChild(element[0]);
  }

  /**
   * Set window z indexes based on the index in the array.
   *
   * @private
   */
  [PRIVATE.updateZIndexes] () {
    _.forEach(this[PRIVATE.windows], (window, index) => {
      window.setZIndex(this[PRIVATE.zIndexBase] + index);
    });
  }

  /**
   * Move the window as the last window if it isn't already.
   *
   * @param window
   * @private
   * @return {boolean} Returns true if the window was moved.
   */
  [PRIVATE.moveToFront] (window) {
    const windows = this[PRIVATE.windows];
    if (windows[windows.length - 1] !== window) {
      _.remove(windows, w => w === window);
      windows.push(window);
      return true;
    }
    return false;
  }

  /**
   * This call moves the nrWindow on the front.
   */
  setFocusOnWindow (window) {
    if (this[PRIVATE.moveToFront](window)) {
      this[PRIVATE.updateZIndexes]();
    }
  }

}

export default NrWindowService;
