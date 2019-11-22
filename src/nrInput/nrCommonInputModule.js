import angular from 'angular';
import NrModuleName from "../NrModuleName";
import nrTextInputModule from './nrTextInput/nrTextInputModule.js';
import nrPasswordInputModule from './nrPasswordInput/nrPasswordInputModule.js';
import nrTextareaModule from './nrTextarea/nrTextareaModule.js';
import nrDateInputModule from './nrDateInput/nrDateInputModule.js';
import nrSelectModule from './nrSelect/nrSelectModule.js';
import nrMenuModule from './nrMenu/nrMenuModule.js';
import nrButtonModule from './nrButton/nrButtonModule.js';
import nrCheckboxInputModule from "./nrCheckboxInput/nrCheckboxInputModule";
import nrNumberInputModule from "./nrNumberInput/nrNumberInputModule";
import nrDateTimeInputModule from "./nrDateTimeInput/nrDateTimeInputModule";

export const nrCommonInputModule = angular.module(
	NrModuleName.INPUT
	, [
		nrTextInputModule
		, nrPasswordInputModule
		, nrCheckboxInputModule
		, nrTextareaModule
		, nrNumberInputModule
		, nrDateInputModule
		, nrDateTimeInputModule
		, nrSelectModule
		, nrMenuModule
		, nrButtonModule
		// Keep in the same format, it helps with git merges
	])
	.name;

// noinspection JSUnusedGlobalSymbols
export default nrCommonInputModule;
