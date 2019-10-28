import angular from 'angular';
import { nrConfirmDialogComponent } from './nrConfirmDialogComponent.js';
import NrModuleName from "../../NrModuleName";
import NrTag from "../../NrTag";

export const nrConfirmDialogModule = angular.module(
	NrModuleName.CONFIRM_DIALOG
	, [
	])
    .component(NrTag.CONFIRM_DIALOG, nrConfirmDialogComponent)
	.name;
