import angular from 'angular';
import { nrTextInputComponent } from './nrTextInputComponent.js';

export const nrTextInputModule = angular.module(
	"norjs.ui.input.nrTextInput"
	, [
	])
    .component('nrTextInput', nrTextInputComponent)
	.name;
