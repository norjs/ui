import angular from 'angular';
import nrNavComponent from './nrNavComponent';
import NrModuleName from "../NrModuleName";
import NrTag from "../NrTag";

export const nrNavModule = angular.module(
  NrModuleName.NAV
  , [

  ])
  .component(NrTag.NAV, nrNavComponent)
  .name;

// noinspection JSUnusedGlobalSymbols
export default nrNavModule;
