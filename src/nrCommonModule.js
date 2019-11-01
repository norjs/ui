import angular from 'angular';
import nrCompileModule from './compile/compileModule.js';
import nrIconModule from './icon/iconModule.js';
import nrCommonInputModule from './input/nrCommonInputModule.js';
import nrNavModule from './nav/navModule.js';
import nrWindowModule from './window/windowModule.js';
import NrModuleName from "./NrModuleName";
import nrDialogModule from "./dialog/nrDialogModule";
import nrFormModule from "./nrForm/nrFormModule";
import nrServicesModule from "./services/nrServicesModule";

export const nrCommonModule = angular.module(
	NrModuleName.UI
	, [
		nrServicesModule
		, nrCompileModule
		, nrIconModule
		, nrCommonInputModule
		, nrNavModule
		, nrWindowModule
		, nrDialogModule
		, nrFormModule
		// Keep in the same format, it helps with git merges
	])
	.name;

// noinspection JSUnusedGlobalSymbols
export default nrCommonModule;
