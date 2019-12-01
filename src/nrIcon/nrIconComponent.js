import template from './nr-icon-template.html';
import './nr-icon-styles.css';
import NrIconController from './NrIconController';
import 'font-awesome/scss/font-awesome.scss';
import NrAttribute from "../NrAttribute";

/**
 *
 * @type {angular.IComponentOptions}
 * @ngInject
 */
const nrIconComponent = {
  template
  , bindings: {
    __type: `@${NrAttribute.TYPE}`
  }
  , controller: NrIconController
};

export default nrIconComponent;
