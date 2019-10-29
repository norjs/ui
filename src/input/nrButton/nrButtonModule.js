import angular from 'angular';
import nrButtonComponent from './nrButtonComponent.js';
import NrModuleName from "../../NrModuleName";
import NrTag from "../../NrTag";

export const nrButtonModule = angular.module(
	NrModuleName.BUTTON
	, [
	])
    .component(NrTag.BUTTON, nrButtonComponent)
	.name;

// noinspection JSUnusedGlobalSymbols
export default nrButtonModule;
