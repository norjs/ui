import angular from 'angular';
import { nrTextInputComponent } from './nrTextInputComponent.js';

export const nrTextInputModule = angular.module(
	"myapp.common.nrTextInput"
	, [
	])
    .component('nrTextInput', nrTextInputComponent)
	.name;
