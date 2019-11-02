import angular from 'angular';
import nrCompileModule from './nrCompile/nrCompileModule.js';
import nrIconModule from './nrIcon/nrIconModule.js';
import nrCommonInputModule from './nrInput/nrCommonInputModule.js';
import nrNavModule from './nrNav/nrNavModule.js';
import nrWindowModule from './nrWindow/nrWindowModule.js';
import NrModuleName from "./NrModuleName";
import nrDialogModule from "./nrDialog/nrDialogModule";
import nrFormModule from "./nrForm/nrFormModule";
import nrMessageModule from "./nrMessage/nrMessageModule";
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
		, nrMessageModule
		// Keep in the same format, it helps with git merges
	])
	.name;

// noinspection JSUnusedGlobalSymbols
export default nrCommonModule;
