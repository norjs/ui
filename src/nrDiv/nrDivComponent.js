import template from './nr-div-template.html';
import './nr-div-styles.scss';
import {NrDivController} from './NrDivController';

export const nrDivComponent = {
    template,
    controller: NrDivController,
    bindings: NrDivController.getBindings()
};
