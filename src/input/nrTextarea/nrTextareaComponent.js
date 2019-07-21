import template from './nr-textarea-template.html';
import './nr-textarea-styles.scss';
import {NrTextareaController} from './NrTextareaController';

/**
 *
 * @type {{template: string, controller: NrTextareaController, bindings: {__name: string, __ngModel: string, __type: string, __id: string, __label: string}, require: {__nrForm: string, __ngModelController: string}}}
 */
export const nrTextareaComponent = NrTextareaController.getComponentConfig(template);
