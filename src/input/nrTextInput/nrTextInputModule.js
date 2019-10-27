import angular from 'angular';
import nrTextInputComponent from './nrTextInputComponent.js';
import NrModuleName from "../../NrModuleName";
import NrTag from "../../NrTag";

export const nrTextInputModule = angular.module(
	NrModuleName.TEXT_INPUT
	, [
	])
    .component(NrTag.TEXT_INPUT, nrTextInputComponent)
	.name;

// noinspection JSUnusedGlobalSymbols
export default nrTextInputModule;
