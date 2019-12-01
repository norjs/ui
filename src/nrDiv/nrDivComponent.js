import template from './nr-div-template.html';
import './nr-div-styles.scss';
import {NrDivController} from './NrDivController';

/**
 *
 * @type {{template, controller: NrDivController, bindings: {bindNrModel: string}}}
 * @ngInject
 */
export const nrDivComponent = {
    template,
    controller: NrDivController,
    bindings: NrDivController.getBindings()
};

export default nrDivComponent;
