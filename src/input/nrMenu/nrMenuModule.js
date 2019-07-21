import angular from 'angular';
import { nrMenuComponent } from './nrMenuComponent.js';

export const nrMenuModule = angular.module(
	"myapp.common.nrMenu"
	, [
	])
    .component('nrMenu', nrMenuComponent)
	.name;
