import template from './nr-window-template.html';
import './nr-window-styles.scss';
import NrWindowController from './NrWindowController';
import NrAttribute from "../NrAttribute";

/**
 *
 * @type {angular.IComponentOptions}
 */
export const nrWindowComponent = {
  template
  , transclude: true
  , bindings: {
    __title: `@${NrAttribute.WINDOW_TITLE}`
    , __onClose: `&?${NrAttribute.WINDOW_CLOSE}`
  }
  , controller: NrWindowController
};

export default nrWindowComponent;
