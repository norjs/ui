import NrCompileController from './NrCompileController';
import NrAttribute from "../NrAttribute";

/**
 *
 * @type {{controller: NrCompileController}}
 */
let nrCompileComponent = {
  transclude: true
  , bindings: {
    "__options"   : `<?${NrAttribute.OPTIONS}`,
    "__component" : `@?${NrAttribute.COMPONENT}`,
    "__resolve"   : `<?${NrAttribute.RESOLVE}`,
    "__content"   : `@?${NrAttribute.CONTENT}`
  }
  , controller: NrCompileController
};

export default nrCompileComponent;
