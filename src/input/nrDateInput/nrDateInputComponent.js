import template from './nr-date-input-template.html';
import './nr-date-input-styles.scss';
import {NrDateInputController} from './NrDateInputController';

/**
 *
 * @type {{template: string, controller: NrDateInputController, bindings: {__name: string, __ngModel: string, __type: string, __id: string, __label: string}, require: {__nrForm: string, __ngModelController: string}}}
 */
export const nrDateInputComponent = NrDateInputController.getComponentConfig(template);
