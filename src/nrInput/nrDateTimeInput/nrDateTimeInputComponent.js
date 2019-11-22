import template from './nr-date-time-input-template.html';
import './nr-date-time-input-styles.scss';
import NrDateTimeInputController from './NrDateTimeInputController';

/**
 *
 * @type {angular.IComponentOptions}
 */
export const nrDateTimeInputComponent = NrDateTimeInputController.getComponentConfig(template);

// noinspection JSUnusedGlobalSymbols
export default nrDateTimeInputComponent;
