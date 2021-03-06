import template from './nr-form-template.html';
import './nr-form-styles.scss';
import {NrFormController} from './NrFormController';

/**
 *
 * @type {{template, controller: NrFormController, bindings: {bindNrModel: string, bindCancelAction: string, bindSubmitAction: string}}}
 * @ngInject
 */
export const nrFormComponent = {
    template,
    controller: NrFormController,
    bindings: NrFormController.getBindings()
};

export default nrFormComponent;
