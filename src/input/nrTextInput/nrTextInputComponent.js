import template from './nr-text-input-template.html';
import './nr-text-input-styles.scss';
import NrTextInputController from './NrTextInputController';

/**
 *
 * @type {angular.IComponentOptions}
 */
export const nrTextInputComponent = NrTextInputController.getComponentConfig(template);

// noinspection JSUnusedGlobalSymbols
export default nrTextInputComponent;
