import template from './nr-nav-template.html';
import './nr-nav-styles.scss';
import NrNavController from './NrNavController';
import NrAttribute from "../NrAttribute";

/**
 *
 * @type {angular.IComponentOptions}
 * @fixme Implement attribute to override style from nrModel
 * @fixme Implement attribute to override nr-click from options.onClick
 * @ngInject
 */
export const nrNavComponent = {
  template
  , bindings: {
    bindCollection: `<?${NrAttribute.COLLECTION}`
    , bindOptions: `<?${NrAttribute.OPTIONS}`
    , bindNrModel: `<?${NrAttribute.MODEL}`
  }
  , controller: NrNavController
};

export default nrNavComponent;
