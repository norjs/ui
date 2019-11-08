import angular from 'angular';
import nrNumberInputComponent from './nrNumberInputComponent.js';
import NrTag from "../../NrTag";
import NrModuleName from "../../NrModuleName";

export const nrNumberInputModule = angular.module(
	NrModuleName.NUMBER_INPUT
	, [
	])
    .component(NrTag.NUMBER_INPUT, nrNumberInputComponent)
	.name;

// noinspection JSUnusedGlobalSymbols
export default nrNumberInputModule;
