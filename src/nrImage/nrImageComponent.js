import template from './nr-image-template.html';
import './nr-image-styles.scss';
import NrImageController from './NrImageController';
import NrAttribute from "../NrAttribute";

/**
 *
 * @type {angular.IComponentOptions}
 * @ngInject
 */
const nrImageComponent = {
  template
  , bindings: {
    bindNrModel: `<${NrAttribute.MODEL}`
  }
  , controller: NrImageController
};

export default nrImageComponent;
