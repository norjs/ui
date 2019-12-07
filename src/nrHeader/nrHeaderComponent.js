import template from './nr-header-template.html';
import './nr-header-styles.scss';
import NrHeaderController from './NrHeaderController';
import NrAttribute from "../NrAttribute";

/**
 *
 * @type {angular.IComponentOptions}
 * @ngInject
 */
const nrHeaderComponent = {
  template
  , bindings: {
    bindNrModel: `<${NrAttribute.MODEL}`
  }
  , controller: NrHeaderController
};

export default nrHeaderComponent;
