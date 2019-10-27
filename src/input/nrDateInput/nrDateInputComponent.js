import template from './nr-date-input-template.html';
import './nr-date-input-styles.scss';
import NrDateInputController from './NrDateInputController';

/**
 *
 * @type {angular.IComponentOptions}
 */
export const nrDateInputComponent = NrDateInputController.getComponentConfig(template);

// noinspection JSUnusedGlobalSymbols
export default nrDateInputComponent;
