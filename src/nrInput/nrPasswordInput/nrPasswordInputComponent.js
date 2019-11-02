import template from './nr-password-input-template.html';
import './nr-password-input-styles.scss';
import NrPasswordInputController from './NrPasswordInputController';

/**
 *
 * @type {angular.IComponentOptions}
 */
export const nrPasswordInputComponent = NrPasswordInputController.getComponentConfig(template);

// noinspection JSUnusedGlobalSymbols
export default nrPasswordInputComponent;
