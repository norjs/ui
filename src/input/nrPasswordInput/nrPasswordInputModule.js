import angular from 'angular';
import { nrPasswordInputComponent } from './nrPasswordInputComponent.js';

export const nrPasswordInputModule = angular.module(
	"norjs.ui.input.nrPasswordInput"
	, [
	])
    .component('nrPasswordInput', nrPasswordInputComponent)
	.name;
