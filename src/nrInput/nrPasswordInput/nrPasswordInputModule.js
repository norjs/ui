import angular from 'angular';
import nrPasswordInputComponent from './nrPasswordInputComponent.js';
import NrTag from "../../NrTag";
import NrModuleName from "../../NrModuleName";

export const nrPasswordInputModule = angular.module(
	NrModuleName.PASSWORD_INPUT
	, [
	])
    .component(NrTag.PASSWORD_INPUT, nrPasswordInputComponent)
	.name;

// noinspection JSUnusedGlobalSymbols
export default nrPasswordInputModule;
