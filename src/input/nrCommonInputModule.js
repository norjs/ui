import angular from 'angular';
import {nrTextInputModule} from './nrTextInput/nrTextInputModule.js';
import {nrTextareaModule} from './nrTextarea/nrTextareaModule.js';
import {nrDateInputModule} from './nrDateInput/nrDateInputModule.js';
import {nrSelectModule} from './nrSelect/nrSelectModule.js';
import {nrMenuModule} from './nrMenu/nrMenuModule.js';

export const nrCommonInputModule = angular.module(
	"norjs.ui.input"
	, [
		nrTextInputModule
		, nrPasswordInputModule
		, nrTextareaModule
		, nrDateInputModule
		, nrSelectModule
		, nrMenuModule
		// Keep in the same format, it helps with git merges
	])
	.name;
