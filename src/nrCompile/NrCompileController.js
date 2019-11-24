import angular from 'angular';
import _ from 'lodash';
import NrTag from "../NrTag";
import NrCompileUtils from "../../utils/NrCompileUtils";
import LogUtils from "@norjs/utils/Log";
import NrModelUtils from "../../utils/NrModelUtils";

// noinspection JSUnusedLocalSymbols
const nrLog = LogUtils.getLogger(NrTag.COMPILE);

/**
 * This object contains symbols for private members of NrCompileController.
 *
 * @enum {Symbol}
 * @readonly
 * @private
 */
const PRIVATE = {

  /**
   * Symbol for a property containing AngularJS $injector
   */
  $injector: Symbol('$injector'),

  /**
   * Symbol for a property containing AngularJS $nrCompile
   */
  $compile: Symbol('$compile'),

  /**
   * Symbol for a property containing AngularJS $parse
   */
  $parse: Symbol('$parse'),

  /**
   * Symbol for a property containing AngularJS $transclude
   */
  $transclude: Symbol('$transclude'),

  /**
   * Symbol for a property containing AngularJS $scope
   */
  $scope: Symbol('$scope'),

  /**
   * Symbol for a property containing AngularJS $element
   */
  $element: Symbol('$element'),

  /**
   * Symbol for a property containing NrView which should be compiled
   */
  nrModel: Symbol('nrModel'),

  /**
   * Symbol for a property containing the options attribute which contains options as an object
   */
  options: Symbol('options'),

  /**
   * Symbol for a property containing the component attribute, eg. the name of the component as a string.
   */
  component: Symbol('component'),

  /**
   * Symbol for a property containing the resolve attribute data, eg. resolvable data for attributes as an object.
   */
  resolve: Symbol('resolve'),

  /**
   * Symbol for a property containing
   */
  content: Symbol('content'),

  /**
   * Symbol for a property containing a boolean which tells if the controller has been initialized.
   */
  initialized: Symbol('initialized'),

  /**
   * Symbol for a property containing a private method for compiling the element.
   */
  compileElement: Symbol('compileElement'),

  /**
   * Symbol for a property containing a private method for fetching component bindings.
   */
  getComponentBindings: Symbol('getComponentBindings'),

  /**
   * Symbol for a property containing a private method for getting an attribute template as a string
   */
  getAttributeTemplate: Symbol('getAttributeTemplate'),

  /**
   * Symbol for a property containing a private method for building expression functions.
   *
   * It takes params (scope: object, expression: string, args: Array.<string>)
   */
  buildExpressionFn: Symbol('buildExpressionFn')

};

const SNAKE_CASE_REGEXP = /[A-Z]/g;

const NG_ATTRIBUTE_REGEXP = /^([=<@&])[?]?(.*)/;

/**
 * Compiles custom element inside this element.
 *
 * @ngInject
 */
class NrCompileController {

  /**
   *
   * @returns {NrTag|string}
   */
  static get nrName () {
    return NrTag.COMPILE;
  }

  /**
   *
   * @returns {typeof NrCompileController}
   */
  get Class () {
    return NrCompileController;
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
   * @param name {string}
   * @param separator {string}
   * @returns {*}
   */
  static snakeCase (name, separator = '-') {

    if (!_.isString(name)) {
      throw new TypeError(`${this.nrName}.snakeCase(): name not a string: ${LogUtils.getAsString(name)}`);
    }

    if (!_.isString(separator)) {
      throw new TypeError(`${this.nrName}.snakeCase(): separator not a string: ${LogUtils.getAsString(separator)}`);
    }

    name = name.replace(
      SNAKE_CASE_REGEXP,
      ( letter, pos ) => (pos ? separator : '' ) + letter.toLowerCase()
    );
    if (name.length >= 6 && name.substr(0, 5) === 'data-') return `x-${name}`;
    if (name.length >= 3 && name.substr(0, 2) === 'x-') return `x-${name}`;
    return name;
  }

  static get $inject () {
    if (this._inject) return this._inject;
    return ["$injector", "$scope", "$compile", "$parse", "$transclude", "$element"];
  }
  static set $inject (value) {
    this._inject = value;
  }

  /**
   *
   * @param $injector {angular.auto.IInjectorService}
   * @param $scope {angular.IScope}
   * @param $compile {angular.ICompileService}
   * @param $parse {angular.IParseService}
   * @param $transclude {angular.ITranscludeFunction}
   * @param $element {JQLite}
   * @ngInject
   */
  constructor ($injector, $scope, $compile, $parse, $transclude, $element) {

    /**
     *
     * @member {angular.auto.IInjectorService}
     */
    this[PRIVATE.$injector] = $injector;

    /**
     *
     * @member {angular.IParseService}
     */
    this[PRIVATE.$parse] = $parse;

    /**
     *
     * @member {angular.ITranscludeFunction}
     */
    this[PRIVATE.$transclude] = $transclude;

    /**
     *
     * @member {angular.ICompileService}
     */
    this[PRIVATE.$compile] = $compile;

    /**
     *
     * @member {angular.IScope}
     */
    this[PRIVATE.$scope] = $scope;

    /**
     *
     * @member {JQLite}
     */
    this[PRIVATE.$element] = $element;

    /**
     *
     * @member {{component: string, bindings:{}}}
     */
    this[PRIVATE.options] = {};

    /**
     *
     * @member {NrModel|undefined}
     */
    this[PRIVATE.nrModel] = undefined;

    /**
     *
     * @member {boolean}
     */
    this[PRIVATE.initialized] = false;

  }

  // noinspection JSUnusedGlobalSymbols
  /**
   *
   * @returns {NrModel|undefined}
   */
  get bindNrModel () {
    return this[PRIVATE.nrModel];
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   *
   * @param nrModel {NrModel|undefined}
   */
  set bindNrModel (nrModel) {
    if (nrModel !== this[PRIVATE.nrModel]) {
      nrLog.trace(`set bindNrModel: nrModel set as ${LogUtils.getAsString(nrModel)}`);
      this[PRIVATE.nrModel] = nrModel;
    }
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   *
   * @returns {{component: string, bindings:{}}}
   */
  get bindOptions () {
    return this[PRIVATE.options];
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   *
   * @param options {{component: string, bindings:{}}}
   */
  set bindOptions (options) {
    if (options !== this[PRIVATE.options]) {
      nrLog.trace(`set bindOptions: options set as ${LogUtils.getAsString(options)}`);
      this[PRIVATE.options] = options;
    }
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   *
   * @returns {string}
   */
  get bindComponent () {
    return this[PRIVATE.component];
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   *
   * @param component {string}
   */
  set bindComponent (component) {

    if (this[PRIVATE.component] !== component) {
      nrLog.trace(`set bindComponent: component set as ${LogUtils.getAsString(component)}`);
      this[PRIVATE.component] = component;
    }

  }

  // noinspection JSUnusedGlobalSymbols
  /**
   *
   * @returns {string}
   */
  get bindContent () {
    return this[PRIVATE.content];
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   *
   * @param content {string}
   */
  set bindContent (content) {

    if (this[PRIVATE.content] !== content) {
      nrLog.trace(`set bindContent: content set as ${LogUtils.getAsString(content)}`);
      this[PRIVATE.content] = content;
    }

  }

  // noinspection JSUnusedGlobalSymbols
  /**
   *
   * @returns {{}}
   */
  get bindResolve () {
    return this[PRIVATE.resolve];
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   *
   * @param resolve {{}}
   */
  set bindResolve (resolve) {
    this[PRIVATE.resolve] = resolve;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @fixme: Change to use .registerLifeCycleMethods (however it must be implemented first)
   */
  $onInit () {

    this[PRIVATE.initialized] = true;

    /**
     *
     * @type {{component: NrTag|string, resolve: Object}|undefined}
     */
    let componentConfig = undefined;
    if (this[PRIVATE.nrModel]) {
      componentConfig = NrModelUtils.getComponentConfig(this[PRIVATE.nrModel]);
    }

    if (this[PRIVATE.component] === undefined) {

      if ( this[PRIVATE.options] && this[PRIVATE.options].component ) {

        nrLog.trace(`$onInit(): component set as "${LogUtils.getAsString(this[PRIVATE.options].component)}" from options`);
        this[PRIVATE.component] = this[PRIVATE.options].component;

      } else if ( componentConfig && componentConfig.component ) {

        nrLog.trace(`$onInit(): component set as "${LogUtils.getAsString(componentConfig.component)}" from nrModel`);
        this[PRIVATE.component] = componentConfig.component;

      } else {
          throw new TypeError(`${this.nrName}: No component name configured!`);
      }

    }

    if (this[PRIVATE.content] === undefined && this[PRIVATE.options] && this[PRIVATE.options].content) {
      nrLog.trace(`$onInit(): content set as "${LogUtils.getAsString(this[PRIVATE.options].content)}" from options`)
      this[PRIVATE.content] = this[PRIVATE.options].content;
    }

    if (this[PRIVATE.resolve] === undefined) {

      if (this[PRIVATE.options] && this[PRIVATE.options].resolve) {

        nrLog.trace(`$onInit(): resolve set as "${LogUtils.getAsString(this[PRIVATE.options].resolve)}" from options`);
        this[PRIVATE.resolve] = this[PRIVATE.options].resolve;

      } else if (componentConfig && componentConfig.component) {

        nrLog.trace(`$onInit(): resolve set as "${LogUtils.getAsString(componentConfig.resolve)}" from nrModel`);
        this[PRIVATE.resolve] = componentConfig.resolve;

      }

    }

    this[PRIVATE.compileElement]();

  }

  /**
   * Get component or directive binding configurations.
   *
   * @param name {string}
   * @return {Array.<{name: string, type: string}>} Eg. `[{name: "foo", type: "="}]`
   * @private
   */
  [PRIVATE.getComponentBindings] (name) {

    if (!this[PRIVATE.$injector].has(name + 'Directive')) {
      nrLog.error(`getComponentBindings: Injector did not know about "${name}Directive".`);
      return [];
    }

    const definations = this[PRIVATE.$injector].get(name + 'Directive');
    if (!definations) {
      nrLog.error(`getComponentBindings: Result from injector for "${name}Directive" was non-true: "${definations}"`);
      return [];
    }

    const bindToControllers = _.map(_.filter(definations, d => d && d.bindToController), d => d.bindToController);

    //if (bindToControllers.length <= 0) {
      //nrLog.trace(`Defination for "${name}Directive" did not have .bindToController properties: `, definations);
    //}

    const bindings = _.reduce(bindToControllers, (ret, binds) => _.merge(ret, binds), {});

    nrLog.trace(`getComponentBindings: Bindings for "${name}Directive" are: `, bindings);

    // noinspection UnnecessaryLocalVariableJS
    const result = _.keys(bindings)
            // { key: 'nrInput', bindings: [ '=foo', '=', 'foo' ] }
            .map(key => ({key, bindings: NG_ATTRIBUTE_REGEXP.exec(bindings[key])}))
            .filter(binding => binding && _.isArray(binding.bindings))
            // { name: ('foo' || 'nrInput'), type: '=' }
            .map(binding => ({ name: binding.bindings[2] || binding.key, type: binding.bindings[1] }));

    nrLog.trace(`getComponentBindings: Result for "${name}Directive" is: `, result);

    return result;
  }

  /**
   * Builds a function from AngularJS expression.
   *
   * @param scope {object} The scope object where $eval will be called for the expression
   * @param expression {string} The expression to evaluate when this function is called
   * @param args {Array.<string>} Arguments for the function
   * @return {function(...[*]=): *}
   */
  [PRIVATE.buildExpressionFn] (scope, expression, args) {
    return (...values) => {
      _.each(args, (arg, index) => {
        const value = values[index];
        if ( value === undefined && !_.has(scope, arg) && this[PRIVATE.$injector].has(arg)) {
          values[index] = this[PRIVATE.$injector].get(arg);
        }
      });
      return scope.$eval(NrCompileUtils.stringifyExpression(expression), _.zipObject(args, values))
    };
  }

  /**
   *
   * @param binding {{name:string, type:string}}
   * @param opts {{scope:object}}
   * @returns {string}
   */
  [PRIVATE.getAttributeTemplate] (binding, opts = {}) {

    const { scope } = opts;
    const prefix = '';
    const { name, type } = binding;
    const attributeName = NrCompileController.snakeCase(name);
    const resolveName = name;
    switch (type) {

    case '@':
      return `${attributeName}='{{${prefix}$resolve.${resolveName}}}'`;

    case '&':
      let fn = this[PRIVATE.resolve][resolveName];

      let args;
      if (_.isString(fn)) {
        args = [];
        fn = this[PRIVATE.resolve][resolveName] = this[PRIVATE.buildExpressionFn](scope, fn, args);
      } else if (_.isArray(fn) && fn.length >= 1) {
        args = fn.slice(0, fn.length - 1);
        this[PRIVATE.resolve][resolveName][fn.length - 1] = this[PRIVATE.buildExpressionFn](scope, _.last(fn), args);
      } else {
        args = (fn && this[PRIVATE.$injector].annotate(fn)) || [];
      }

      const arrayIndexString = _.isArray(fn) ? `[${fn.length - 1}]` : '';
      return `${attributeName}='$resolve.${resolveName}${arrayIndexString}(${args.join(',')})'`;

    default:
      return `${attributeName}='${prefix}$resolve.${resolveName}'`;
    }
  }

  /**
   * Compile and place the compiled element on the DOM as child of `this[PRIVATE.$element]`.
   */
  [PRIVATE.compileElement] () {

    const componentName = this[PRIVATE.component];

    if (!_.isString(componentName)) {
      throw new TypeError(`${this.nrName}[PRIVATE.compileElement](): componentName was not a string: ${LogUtils.getAsString(componentName)}`);
    }

    nrLog.trace('compileElement: componentName: ', componentName);

    const scope = this[PRIVATE.$scope].$new();

    scope.$resolve = this[PRIVATE.resolve];

    const componentBindings = this[PRIVATE.getComponentBindings](componentName);

    nrLog.trace('compileElement: componentBindings: ', componentBindings);

    const tagName = NrCompileController.snakeCase(componentName);

    let attrs = _.map(
      _.filter(
        componentBindings,
        binding => _.has(this[PRIVATE.resolve], binding.name)
      ),
      binding => this[PRIVATE.getAttributeTemplate](binding, {scope})
    ).join(' ');

    attrs = attrs ? ' ' + attrs : '';

    const content = this[PRIVATE.content] ? this[PRIVATE.content] : '';

    const html = `<${tagName}${attrs}>${content}</${tagName}>`;

    const template = angular.element(html);

    this[PRIVATE.$element][0].appendChild(template[0]);

    const linkFn = this[PRIVATE.$compile](template);

    //let transclude;
    //if (content === '' && this[PRIVATE.$transclude]) {
    //  transclude = this[PRIVATE.$transclude]();
    //}

    // noinspection JSUnusedLocalSymbols
    const element = linkFn(scope);

    //if (transclude && transclude.length >= 1) {
    //  let i;
    //  for(i=0; i !== transclude.length; i += 1) {
    //    element[0].appendChild(transclude[i]);
    //  }
    //}


  }

}

export default NrCompileController;
