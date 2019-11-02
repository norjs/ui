import template from './nr-confirm-dialog-template.html';
import './nr-confirm-dialog-styles.scss';
import {NrConfirmDialogController} from './NrConfirmDialogController';

export const nrConfirmDialogComponent = {
    template,
    controller: NrConfirmDialogController,
    bindings: NrConfirmDialogController.getBindings()
}
