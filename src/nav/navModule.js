import angular from 'angular';
import navComponent from './navComponent';
import NrModuleName from "../NrModuleName";
import NrTag from "../NrTag";

export const navModule = angular.module(
  NrModuleName.NAV
  , [

  ])
  .component(NrTag.NAV, navComponent)
  .name;

// noinspection JSUnusedGlobalSymbols
export default navModule;
