import angular from 'angular';
import nrWindowComponent from './nrWindowComponent';
import NrWindowService from './NrWindowService';
import NrTag from "../NrTag";
import NrModuleName from "../NrModuleName";
import NrServiceName from "../NrServiceName";

export const nrWindowModule = angular.module(
  NrModuleName.WINDOW
  , [

  ])
  .component(NrTag.WINDOW, nrWindowComponent)
  .service(NrServiceName.WINDOW, NrWindowService)
  .name;

// noinspection JSUnusedGlobalSymbols
export default nrWindowModule;
