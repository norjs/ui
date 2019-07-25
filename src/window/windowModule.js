import angular from 'angular';
import windowComponent from './windowComponent';
import WindowService from './WindowService';

export default angular.module(
  "norjs.ui.window"
  , [

  ])
  .component('nrWindow', windowComponent)
  .service('nrWindowService', WindowService)
  .name;
