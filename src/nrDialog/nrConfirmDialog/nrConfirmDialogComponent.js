import template from './nr-confirm-dialog-template.html';
import './nr-confirm-dialog-styles.scss';
import {NrConfirmDialogController} from './NrConfirmDialogController';

/**
 *
 * @type {{template, controller: NrConfirmDialogController, bindings: {model: string, acceptAction: string, cancelAction: string}}}
 * @ngInject
 */
export const nrConfirmDialogComponent = {
    template,
    controller: NrConfirmDialogController,
    bindings: NrConfirmDialogController.getBindings()
};

export default nrConfirmDialogComponent;
