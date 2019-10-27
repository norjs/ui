import angular from 'angular';
import nrMenuComponent from './nrMenuComponent.js';
import NrModuleName from "../../NrModuleName";
import NrTag from "../../NrTag";

export const nrMenuModule = angular.module(
	NrModuleName.MENU
	, [
	])
    .component(NrTag.MENU, nrMenuComponent)
	.name;

// noinspection JSUnusedGlobalSymbols
export default nrMenuModule;
