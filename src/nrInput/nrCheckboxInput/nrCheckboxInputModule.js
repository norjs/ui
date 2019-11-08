import angular from 'angular';
import nrCheckboxInputComponent from './nrCheckboxInputComponent.js';
import NrTag from "../../NrTag";
import NrModuleName from "../../NrModuleName";

export const nrCheckboxInputModule = angular.module(
	NrModuleName.CHECKBOX_INPUT
	, [
	])
    .component(NrTag.CHECKBOX_INPUT, nrCheckboxInputComponent)
	.name;

// noinspection JSUnusedGlobalSymbols
export default nrCheckboxInputModule;
