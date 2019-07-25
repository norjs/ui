import angular from 'angular';
import { nrDateInputComponent } from './nrDateInputComponent.js';

export const nrDateInputModule = angular.module(
	"norjs.ui.input.nrDateInput"
	, [
	])
    .component('nrDateInput', nrDateInputComponent)
	.name;
