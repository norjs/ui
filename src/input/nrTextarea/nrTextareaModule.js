import angular from 'angular';
import { nrTextareaComponent } from './nrTextareaComponent.js';

export const nrTextareaModule = angular.module(
	"myapp.common.nrTextarea"
	, [
	])
    .component('nrTextarea', nrTextareaComponent)
	.name;
