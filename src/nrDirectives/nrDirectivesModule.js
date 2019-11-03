import angular from 'angular';
import nrRegisterNgModelController from './nrRegisterNgModelController.js';
import NrModuleName from "../NrModuleName";
import NrDirectiveName from "../NrDirectiveName";

export const nrDirectivesModule = angular.module(
    NrModuleName.UI_DIRECTIVES
    , [
    ])
    .directive(NrDirectiveName.REGISTER_NG_MODEL_CONTROLLER, nrRegisterNgModelController)
    .name;

// noinspection JSUnusedGlobalSymbols
export default nrDirectivesModule;
