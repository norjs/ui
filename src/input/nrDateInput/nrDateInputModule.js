import angular from 'angular';
import { nrDateInputComponent } from './nrDateInputComponent.js';

export const nrDateInputModule = angular.module(
	"myapp.common.nrDateInput"
	, [
	])
    .component('nrDateInput', nrDateInputComponent)
	.name;
