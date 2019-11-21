import angular from 'angular';
import nrCompileModule from './nrCompile/nrCompileModule.js';
import nrIconModule from './nrIcon/nrIconModule.js';
import nrCommonInputModule from './nrInput/nrCommonInputModule.js';
import nrNavModule from './nrNav/nrNavModule.js';
import nrWindowModule from './nrWindow/nrWindowModule.js';
import NrModuleName from "./NrModuleName";
import nrDialogModule from "./nrDialog/nrDialogModule";
import nrFormModule from "./nrForm/nrFormModule";
import nrDivModule from "./nrDiv/nrDivModule";
import nrGridModule from "./nrGrid/nrGridModule";
import nrMessageModule from "./nrMessage/nrMessageModule";
import nrServicesModule from "./services/nrServicesModule";
import nrDirectivesModule from "./nrDirectives/nrDirectivesModule";

export const nrCommonModule = angular.module(
	NrModuleName.UI
	, [
		nrServicesModule
		, nrDirectivesModule
		, nrCompileModule
		, nrIconModule
		, nrCommonInputModule
		, nrNavModule
		, nrWindowModule
		, nrDialogModule
		, nrFormModule
		, nrMessageModule
		, nrDivModule
		, nrGridModule
		// Keep in the same format, it helps with git merges
	])
	.name;

// noinspection JSUnusedGlobalSymbols
export default nrCommonModule;
