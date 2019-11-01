import angular from 'angular';
import { nrFormComponent } from './nrFormComponent.js';
import NrModuleName from "../NrModuleName";
import NrTag from "../NrTag";

export const nrFormModule = angular.module(
	NrModuleName.FORM
	, [
	])
    .component(NrTag.FORM, nrFormComponent)
	.name;

export default nrFormModule;
