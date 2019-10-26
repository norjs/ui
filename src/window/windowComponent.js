import template from './window-template.html';
import './window-styles.scss';
import WindowController from './WindowController';

/**
 *
 * @type {{template, controller: WindowController}}
 */
let windowComponent = {
  template
  , transclude: true
  , bindings: {
    __title: '@nrTitle'
    , __onClose: '&?nrClose'
  }
  , controller: WindowController
};

export default windowComponent;
