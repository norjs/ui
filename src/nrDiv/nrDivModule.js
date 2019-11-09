import angular from 'angular';
import { nrDivComponent } from './nrDivComponent.js';
import NrModuleName from "../NrModuleName";
import NrTag from "../NrTag";

export const nrDivModule = angular.module(
	NrModuleName.DIV
	, [
	])
    .component(NrTag.DIV, nrDivComponent)
	.name;

export default nrDivModule;
