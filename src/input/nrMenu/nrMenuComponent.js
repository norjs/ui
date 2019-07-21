import template from './nr-menu-template.html';
import './nr-menu-styles.scss';
import {NrMenuController} from './NrMenuController';

/**
 *
 * @type {{template: string, controller: NrMenuController, bindings: {__name: string, __ngModel: string, __type: string, __id: string, __label: string}, require: {__nrForm: string, __ngModelController: string}}}
 */
export const nrMenuComponent = NrMenuController.getComponentConfig(template);
