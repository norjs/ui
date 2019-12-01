import template from './nr-grid-template.html';
import './nr-grid-styles.scss';
import {NrGridController} from './NrGridController';

/**
 *
 * @type {{template, controller: NrGridController, bindings: {bindNrModel: string}}}
 * @ngInject
 */
export const nrGridComponent = {
    template,
    controller: NrGridController,
    bindings: NrGridController.getBindings()
};

export default nrGridComponent;
