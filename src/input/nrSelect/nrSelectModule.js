import angular from 'angular';
import { nrSelectComponent } from './nrSelectComponent.js';

export const nrSelectModule = angular.module(
	"myapp.common.nrSelect"
	, [
	])
    .component('nrSelect', nrSelectComponent)
	.name;
