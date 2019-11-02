import angular from 'angular';
import nrMessageComponent from './nrMessageComponent.js';
import NrModuleName from "../NrModuleName";
import NrTag from "../NrTag";

export const nrMessageModule = angular.module(
	NrModuleName.MESSAGE
	, [
	])
    .component(NrTag.MESSAGE, nrMessageComponent)
	.name;

// noinspection JSUnusedGlobalSymbols
export default nrMessageModule;
