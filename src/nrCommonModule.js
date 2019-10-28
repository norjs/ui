import angular from 'angular';
import compileModule from './compile/compileModule.js';
import iconModule from './icon/iconModule.js';
import nrCommonInputModule from './input/nrCommonInputModule.js';
import navModule from './nav/navModule.js';
import windowModule from './window/windowModule.js';
import NrModuleName from "./NrModuleName";
import nrCommonDialogModule from "./dialog/nrCommonDialogModule";

export const nrCommonModule = angular.module(
	NrModuleName.UI
	, [
		compileModule
		, iconModule
		, nrCommonInputModule
		, navModule
		, windowModule
		, nrCommonDialogModule
		// Keep in the same format, it helps with git merges
	])
	.name;

// noinspection JSUnusedGlobalSymbols
export default nrCommonModule;
