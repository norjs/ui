import template from './nr-grid-template.html';
import './nr-grid-styles.scss';
import {NrGridController} from './NrGridController';

export const nrGridComponent = {
    template,
    controller: NrGridController,
    bindings: NrGridController.getBindings()
};
