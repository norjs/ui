import angular from 'angular';
import nrIconComponent from './nrIconComponent';
import NrModuleName from "../NrModuleName";
import NrTag from "../NrTag";

export const nrIconModule = angular.module(
  NrModuleName.ICON
  , [

  ])
  .component( NrTag.ICON, nrIconComponent)
  .name;

// noinspection JSUnusedGlobalSymbols
export default nrIconModule;
