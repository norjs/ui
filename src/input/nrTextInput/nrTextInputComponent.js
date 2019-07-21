import template from './nr-text-input-template.html';
import './nr-text-input-styles.scss';
import {NrTextInputController} from './NrTextInputController';

/**
 *
 * @type {{template: string, controller: NrTextInputController, bindings: {__name: string, __ngModel: string, __type: string, __id: string, __label: string}, require: {__nrForm: string, __ngModelController: string}}}
 */
export const nrTextInputComponent = NrTextInputController.getComponentConfig(template);
