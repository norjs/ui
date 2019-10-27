import angular from 'angular';
import NrModuleName from "../NrModuleName";
import {nrTextInputModule} from './nrTextInput/nrTextInputModule.js';
import {nrPasswordInputModule} from './nrPasswordInput/nrPasswordInputModule.js';
import {nrTextareaModule} from './nrTextarea/nrTextareaModule.js';
import {nrDateInputModule} from './nrDateInput/nrDateInputModule.js';
import {nrSelectModule} from './nrSelect/nrSelectModule.js';
import {nrMenuModule} from './nrMenu/nrMenuModule.js';

export const nrCommonInputModule = angular.module(
	NrModuleName.INPUT
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

// noinspection JSUnusedGlobalSymbols
export default nrCommonInputModule;
