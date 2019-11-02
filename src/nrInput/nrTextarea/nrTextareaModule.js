import angular from 'angular';
import nrTextareaComponent from './nrTextareaComponent.js';
import NrTag from "../../NrTag";
import NrModuleName from "../../NrModuleName";

export const nrTextareaModule = angular.module(
	NrModuleName.TEXTAREA
	, [
	])
    .component(NrTag.TEXTAREA, nrTextareaComponent)
	.name;

// noinspection JSUnusedGlobalSymbols
export default nrTextareaModule;
