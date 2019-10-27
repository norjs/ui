import template from './nr-select-template.html';
import './nr-select-styles.scss';
import NrSelectController from './NrSelectController';

/**
 *
 * @type {angular.IComponentOptions}
 */
export const nrSelectComponent = NrSelectController.getComponentConfig(template);

// noinspection JSUnusedGlobalSymbols
export default nrSelectComponent;
