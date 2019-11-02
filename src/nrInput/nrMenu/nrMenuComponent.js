import template from './nr-menu-template.html';
import './nr-menu-styles.scss';
import NrMenuController from './NrMenuController';

/**
 *
 * @type {angular.IComponentOptions}
 */
export const nrMenuComponent = NrMenuController.getComponentConfig(template);

// noinspection JSUnusedGlobalSymbols
export default nrMenuComponent;
