import angular from 'angular';
import NrModuleName from "../NrModuleName";
import {nrConfirmDialogModule} from "./nrConfirmDialog/nrConfirmDialogModule";

export const nrCommonDialogModule = angular.module(
    NrModuleName.DIALOG
    , [
        nrConfirmDialogModule
        // Keep in the same format, it helps with git merges
    ])
    .name;

// noinspection JSUnusedGlobalSymbols
export default nrCommonDialogModule;
