import angular from 'angular';
import { nrTextareaComponent } from './nrTextareaComponent.js';

export const nrTextareaModule = angular.module(
	"norjs.ui.input.nrTextarea"
	, [
	])
    .component('nrTextarea', nrTextareaComponent)
	.name;
