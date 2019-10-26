import template from './icon-template.html';
import './icon-styles.css';
import IconController from './IconController';
import 'font-awesome/scss/font-awesome.scss';

/**
 *
 * @type {{template, controller: IconController}}
 */
let iconComponent = {
  template
  , bindings: {
    __type: "@nrType"
  }
  , controller: IconController
};

export default iconComponent;
