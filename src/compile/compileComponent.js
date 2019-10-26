import CompileController from './CompileController';

/**
 *
 * @type {{controller: CompileController}}
 */
let compileComponent = {
  transclude: true
  , bindings: {
    "__options": "<?nr-options",
    "__component": "@?nr-component",
    "__resolve": "<?nr-resolve",
    "__content": "@?nr-content"
  }
  , controller: CompileController
};

export default compileComponent;
