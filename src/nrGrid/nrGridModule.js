import angular from 'angular';
import { nrGridComponent } from './nrGridComponent.js';
import NrModuleName from "../NrModuleName";
import NrTag from "../NrTag";

export const nrGridModule = angular.module(
	NrModuleName.GRID
	, [
	])
    .component(NrTag.GRID, nrGridComponent)
	.name;

export default nrGridModule;
