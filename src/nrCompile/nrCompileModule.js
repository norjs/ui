import angular from 'angular';
import nrCompileComponent from './nrCompileComponent';
import NrTag from "../NrTag";
import NrModuleName from "../NrModuleName";

export const nrCompileModule = angular.module(
  NrModuleName.COMPILE
  , [
  ])
  .component(NrTag.COMPILE, nrCompileComponent)
  .name;

export default nrCompileModule;
