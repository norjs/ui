import angular from 'angular';
import nrSelectComponent from './nrSelectComponent.js';
import NrTag from "../../NrTag";
import NrModuleName from "../../NrModuleName";

export const nrSelectModule = angular.module(
	NrModuleName.SELECT
	, [
	])
    .component(NrTag.SELECT, nrSelectComponent)
	.name;

// noinspection JSUnusedGlobalSymbols
export default nrSelectModule;
