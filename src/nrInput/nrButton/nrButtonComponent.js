import template from './nr-button-template.html';
import './nr-button-styles.scss';
import NrButtonController from './NrButtonController';

/**
 *
 * @type {angular.IComponentOptions}
 * @ngInject
 */
export const nrButtonComponent = NrButtonController.getComponentConfig(template);

// noinspection JSUnusedGlobalSymbols
export default nrButtonComponent;
