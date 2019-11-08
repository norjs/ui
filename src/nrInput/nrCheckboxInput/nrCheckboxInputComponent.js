import template from './nr-checkbox-input-template.html';
import './nr-checkbox-input-styles.scss';
import NrCheckboxInputController from './NrCheckboxInputController';

/**
 *
 * @type {angular.IComponentOptions}
 */
export const nrCheckboxInputComponent = NrCheckboxInputController.getComponentConfig(template);

// noinspection JSUnusedGlobalSymbols
export default nrCheckboxInputComponent;
