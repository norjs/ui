import angular from 'angular';
import windowComponent from './windowComponent';
import WindowService from './WindowService';
import NrTag from "../NrTag";
import NrModuleName from "../NrModuleName";
import NrServiceName from "../NrServiceName";

export const windowModule = angular.module(
  NrModuleName.WINDOW
  , [

  ])
  .component(NrTag.WINDOW, windowComponent)
  .service(NrServiceName.WINDOW, WindowService)
  .name;

// noinspection JSUnusedGlobalSymbols
export default windowModule;
