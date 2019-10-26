import angular from 'angular';
import compileComponent from './compileComponent';

export const compileModule = angular.module(
  "norjs.ui.compile"
  , [

  ])
  .component('nrCompile', compileComponent)
  .name;

export default compileModule;
