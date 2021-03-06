import angular from 'angular';
import NrRequestService from './NrRequestService.js';
import NrLocalStorageService from './NrLocalStorageService.js';
import NrSessionStorageService from './NrSessionStorageService.js';
import NrModuleName from "../NrModuleName";
import NrServiceName from "../NrServiceName";

export const nrServicesModule = angular.module(
    NrModuleName.UI_SERVICES
  , [
  ])
  .service(NrServiceName.REQUEST, NrRequestService)
  .service(NrServiceName.LOCAL_STORAGE, NrLocalStorageService)
  .service(NrServiceName.SESSION_STORAGE, NrSessionStorageService)
  .name;

export default nrServicesModule;
