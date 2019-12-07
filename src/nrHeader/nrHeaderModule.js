import angular from 'angular';
import nrHeaderComponent from './nrHeaderComponent';
import NrModuleName from "../NrModuleName";
import NrTag from "../NrTag";

export const nrHeaderModule = angular.module(
  NrModuleName.HEADER
  , [

  ])
  .component( NrTag.HEADER, nrHeaderComponent)
  .name;

// noinspection JSUnusedGlobalSymbols
export default nrHeaderModule;
