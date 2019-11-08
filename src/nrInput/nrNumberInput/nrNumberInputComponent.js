import template from './nr-number-input-template.html';
import './nr-number-input-styles.scss';
import NrNumberInputController from './NrNumberInputController';

/**
 *
 * @type {angular.IComponentOptions}
 */
export const nrNumberInputComponent = NrNumberInputController.getComponentConfig(template);

// noinspection JSUnusedGlobalSymbols
export default nrNumberInputComponent;
