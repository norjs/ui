import template from './nav-template.html';
import './nav-styles.css';
import NavController from './NavController';
import NrAttribute from "../NrAttribute";

/**
 *
 * @type {angular.IComponentOptions}
 */
export const navComponent = {
  template
  , bindings: {
    __collection: `<?${NrAttribute.COLLECTION}`
    , __options: `<?${NrAttribute.OPTIONS}`
  }
  , controller: NavController
};

export default navComponent;
