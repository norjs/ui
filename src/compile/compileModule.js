import angular from 'angular';
import compileComponent from './compileComponent';
import NrTag from "../NrTag";
import NrModuleName from "../NrModuleName";

export const compileModule = angular.module(
  NrModuleName.COMPILE
  , [
  ])
  .component(NrTag.COMPILE, compileComponent)
  .name;

export default compileModule;
