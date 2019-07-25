import angular from 'angular';
import { nrSelectComponent } from './nrSelectComponent.js';

export const nrSelectModule = angular.module(
	"norjs.ui.input.nrSelect"
	, [
	])
    .component('nrSelect', nrSelectComponent)
	.name;
