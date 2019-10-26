import angular from 'angular';
import navComponent from './navComponent';

export const navModule = angular.module(
  "norjs.ui.nav"
  , [

  ])
  .component('nrNav', navComponent)
  .name;

export default navModule;
