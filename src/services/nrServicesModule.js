import angular from 'angular';
import NrRequestService from './NrRequestService.js';
import NrLocalStorageService from './NrLocalStorageService.js';
import NrSessionStorageService from './NrSessionStorageService.js';
import NrModuleName from "../NrModuleName";

export const nrServicesModule = angular.module(
    NrModuleName.UI_SERVICES
  , [
  ])
  .service("nrRequestService", NrRequestService)
  .service("nrLocalStorageService", NrLocalStorageService)
  .service("nrSessionStorageService", NrSessionStorageService)
  .name;

export default nrServicesModule;
