import angular from 'angular';
import compileComponent from './compileComponent';

export default angular.module(
  "norjs.ui.compile"
  , [

  ])
  .component('nrCompile', compileComponent)
  .name;
