import template from './icon-template.html';
import './icon-styles.css';
import IconController from './IconController';
import 'font-awesome/scss/font-awesome.scss';
import NrAttribute from "../NrAttribute";

/**
 *
 * @type {angular.IComponentOptions}
 */
let iconComponent = {
  template
  , bindings: {
    __type: `@${NrAttribute.TYPE}`
  }
  , controller: IconController
};

export default iconComponent;
