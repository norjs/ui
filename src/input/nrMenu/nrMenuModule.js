import angular from 'angular';
import { nrMenuComponent } from './nrMenuComponent.js';

export const nrMenuModule = angular.module(
	"norjs.ui.input.nrMenu"
	, [
	])
    .component('nrMenu', nrMenuComponent)
	.name;
