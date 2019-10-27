import CompileController from './CompileController';
import NrAttribute from "../NrAttribute";

/**
 *
 * @type {{controller: CompileController}}
 */
let compileComponent = {
  transclude: true
  , bindings: {
    "__options"   : `<?${NrAttribute.OPTIONS}`,
    "__component" : `@?${NrAttribute.COMPONENT}`,
    "__resolve"   : `<?${NrAttribute.RESOLVE}`,
    "__content"   : `@?${NrAttribute.CONTENT}`
  }
  , controller: CompileController
};

export default compileComponent;
