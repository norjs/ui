import angular from 'angular';
import iconComponent from './iconComponent';
import NrModuleName from "../NrModuleName";
import NrTag from "../NrTag";

export const iconModule = angular.module(
  NrModuleName.ICON
  , [

  ])
  .component( NrTag.ICON, iconComponent)
  .name;

// noinspection JSUnusedGlobalSymbols
export default iconModule;
