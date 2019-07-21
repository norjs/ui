import template from './nr-select-template.html';
import './nr-select-styles.scss';
import {NrSelectController} from './NrSelectController';

/**
 *
 * @type {{template: string, controller: NrSelectController, bindings: {__name: string, __ngModel: string, __type: string, __id: string, __label: string}, require: {__nrForm: string, __ngModelController: string}}}
 */
export const nrSelectComponent = NrSelectController.getComponentConfig(template);
