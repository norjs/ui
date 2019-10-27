import template from './window-template.html';
import './window-styles.scss';
import WindowController from './WindowController';
import NrAttribute from "../NrAttribute";

/**
 *
 * @type {angular.IComponentOptions}
 */
export const windowComponent = {
  template
  , transclude: true
  , bindings: {
    __title: `@${NrAttribute.WINDOW_TITLE}`
    , __onClose: `&?${NrAttribute.WINDOW_CLOSE}`
  }
  , controller: WindowController
};

export default windowComponent;
