import angular from 'angular';
import nrImageComponent from './nrImageComponent';
import NrModuleName from "../NrModuleName";
import NrTag from "../NrTag";

export const nrImageModule = angular.module(
  NrModuleName.IMAGE
  , [

  ])
  .component( NrTag.IMAGE, nrImageComponent)
  .name;

// noinspection JSUnusedGlobalSymbols
export default nrImageModule;
