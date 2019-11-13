import NrCompileController from './NrCompileController';
import NrAttribute from "../NrAttribute";
import "./nr-compile-styles.scss";

/**
 *
 * @type {{controller: NrCompileController}}
 */
let nrCompileComponent = {
  transclude: true
  , bindings: {
    "bindNrModel"   : `<?${NrAttribute.MODEL}`,
    "bindOptions"   : `<?${NrAttribute.OPTIONS}`,
    "bindComponent" : `@?${NrAttribute.COMPONENT}`,
    "bindResolve"   : `<?${NrAttribute.RESOLVE}`,
    "bindContent"   : `@?${NrAttribute.CONTENT}`
  }
  , controller: NrCompileController
};

export default nrCompileComponent;
