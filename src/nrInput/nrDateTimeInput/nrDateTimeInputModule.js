import angular from 'angular';
import nrDateTimeInputComponent from './nrDateTimeInputComponent.js';
import NrModuleName from "../../NrModuleName";
import NrTag from "../../NrTag";

export const nrDateTimeInputModule = angular.module(
	NrModuleName.DATE_TIME_INPUT
	, [
	])
    .component(NrTag.DATE_TIME_INPUT, nrDateTimeInputComponent)
	.name;

// noinspection JSUnusedGlobalSymbols
export default nrDateTimeInputModule;