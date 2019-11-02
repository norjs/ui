import template from './nr-nav-template.html';
import './nr-nav-styles.css';
import NrNavController from './NrNavController';
import NrAttribute from "../NrAttribute";

/**
 *
 * @type {angular.IComponentOptions}
 */
export const nrNavComponent = {
  template
  , bindings: {
    __collection: `<?${NrAttribute.COLLECTION}`
    , __options: `<?${NrAttribute.OPTIONS}`
  }
  , controller: NrNavController
};

export default nrNavComponent;
