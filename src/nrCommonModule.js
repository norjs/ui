import angular from 'angular';
import {nrCommonInputModule} from './input/nrCommonInputModule.js';

export const nrCommonModule = angular.module(
	"norjs.ui"
	, [
		nrCommonInputModule
		// Keep in the same format, it helps with git merges
	])
	.name;

export default nrCommonModule;
