import angular from 'angular';
import nrDateInputComponent from './nrDateInputComponent.js';
import NrModuleName from "../../NrModuleName";
import NrTag from "../../NrTag";

export const nrDateInputModule = angular.module(
	NrModuleName.DATE_INPUT
	, [
	])
    .component(NrTag.DATE_INPUT, nrDateInputComponent)
	.name;

// noinspection JSUnusedGlobalSymbols
export default nrDateInputModule;