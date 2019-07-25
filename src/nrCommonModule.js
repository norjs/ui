import angular from 'angular';
import {compileModule} from './compile/compileModule.js';
import {iconModule} from './icon/iconModule.js';
import {nrCommonInputModule} from './input/nrCommonInputModule.js';
import {navModule} from './nav/navModule.js';
import {windowModule} from './window/windowModule.js';

export const nrCommonModule = angular.module(
	"norjs.ui"
	, [
		compileModule
		, iconModule
		, nrCommonInputModule
		, navModule
		, windowModule
		// Keep in the same format, it helps with git merges
	])
	.name;

export default nrCommonModule;
