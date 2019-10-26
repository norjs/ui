import angular from 'angular';
import iconComponent from './iconComponent';

export const iconModule = angular.module(
  "norjs.ui.icon"
  , [

  ])
  .component('nrIcon', iconComponent)
  .name;

export default iconModule;
