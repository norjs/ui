import template from './nav-template.html';
import './nav-styles.css';
import NavController from './NavController';

/**
 *
 * @type {{template, controller: NavController}}
 */
let navComponent = {
  template
  , bindings: {
    __collection: "<?nrCollection"
    , __options: "<?nrOptions"
  }
  , controller: NavController
};

export default navComponent;
