import template from './nr-form-template.html';
import './nr-form-styles.scss';
import {NrFormController} from './NrFormController';

export const nrFormComponent = {
    template,
    controller: NrFormController,
    bindings: NrFormController.getBindings()
};

export default nrFormComponent;
