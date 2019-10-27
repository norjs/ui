import template from './nr-textarea-template.html';
import './nr-textarea-styles.scss';
import NrTextareaController from './NrTextareaController';

/**
 *
 * @type {angular.IComponentOptions}
 */
export const nrTextareaComponent = NrTextareaController.getComponentConfig(template);

// noinspection JSUnusedGlobalSymbols
export default nrTextareaComponent;
