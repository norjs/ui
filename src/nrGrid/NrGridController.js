import _ from 'lodash';
import LogUtils from "@norjs/utils/Log";
import NrTag from "../NrTag";
import NrModelUtils from "../../utils/NrModelUtils";

// noinspection JSUnusedLocalSymbols
const nrLog = LogUtils.getLogger('nrFormController');

/**
 *
 * @enum {Symbol}
 * @readonly
 */
const PRIVATE = {
	nrModel                   : Symbol('_nrModel')
	, items                   : Symbol('_items')
	, ngFormController        : Symbol('_ngForm')
	, fieldControllers        : Symbol('_fieldControllers')
	, rowHeights              : Symbol('_rowHeights')
	, columnWidths            : Symbol('_columnWidths')
	, rowStyles               : Symbol('_rowStyles')
	, columnStyles            : Symbol('_columnStyles')
	, calculationHasBeenDelayed : Symbol('_calculationHasBeenDelayed')
};

/**
 * @typedef {Object} NrComponentConfigObject
 * @property {string} component - The component name
 * @property {Object} resolve - Resolve values
 */

/**
 * @typedef {Object} NrFormItemObject
 * @property {string} id - Unique item id
 * @property {NrModel} model - The model object
 * @property {NrComponentConfigObject} config - The nr-component configuration object
 */

/**
 *
 */
export class NrGridController {

	/**
	 *
	 * @returns {NrTag|string}
	 */
	static get nrName () {
		return NrTag.GRID;
	}

	/**
	 *
	 * @returns {NrTag|string}
	 */
	get nrName () {
		return this.Class.nrName;
	}

	/**
	 *
	 * @returns {typeof NrGridController}
	 */
	get Class () {
		return NrGridController;
	}

	/**
	 *
	 * @returns {{bindNrModel: string}}
	 */
	static getBindings () {
		return {
			bindNrModel: "<nrModel"
		};
	}

	static get $inject () {
		if (this._inject) return this._inject;
		return ["$scope", "$element"];
	}
	static set $inject (value) {
		this._inject = value;
	}

	/**
	 * @param $scope {angular.IScope}
	 * @param $element {JQLite}
	 * @ngInject
	 */
	constructor ($scope, $element) {

		/**
		 *
		 * @member {angular.IScope}
		 * @private
		 */
		this.$scope = $scope;

		/**
		 *
		 * @member {JQLite}
		 * @private
		 */
		this.$element = $element;

		/**
		 *
		 * @member {NrForm | undefined}
		 * @private
		 */
		this[PRIVATE.nrModel] = undefined;

		/**
		 *
		 * @member {Array | undefined}
		 * @private
		 */
		this[PRIVATE.items] = [];

		/**
		 *
		 * @member {Array<string|number>}
		 * @private
		 */
		this[PRIVATE.rowHeights] = [];

		/**
		 *
		 * @member {Array<string|number>}
		 * @private
		 */
		this[PRIVATE.columnWidths] = [];

		/**
		 *
		 * @member {Array.<{[height]: string}>}
		 * @private
		 */
		this[PRIVATE.rowStyles] = [];

		/**
		 *
		 * @member {Array.<{[width]: string}>}
		 * @private
		 */
		this[PRIVATE.columnStyles] = [];

		/**
		 *
		 * @member {boolean}
		 * @private
		 */
		this[PRIVATE.calculationHasBeenDelayed] = false;

	}

	// noinspection JSUnusedGlobalSymbols
	$onDestroy () {

		this[PRIVATE.nrModel] = undefined;

		this[PRIVATE.items] = undefined;

	}

	$postLink () {

		this._calculateDimensionsWhenVisible();

	}

	_calculateDimensionsWhenVisible () {

		if (this._isVisible()) {

			this._calculateDimensions();

		} else {

			if (this[PRIVATE.calculationHasBeenDelayed]) {

				nrLog.trace(`${this.nrName}._calculateDimensionsWhenVisible(): Previous calculation already scheduled`);

			} else {

				// Check dimensions at the start of next digest loop
				nrLog.trace(`${this.nrName}._calculateDimensionsWhenVisible(): Delaying dimensions calculations to next digest loop because the element wasn't visible.`);
				this.$scope.$applyAsync( () => {

					this[PRIVATE.calculationHasBeenDelayed] = false;

					this._calculateDimensions();

				});

				this[PRIVATE.calculationHasBeenDelayed] = true;

			}


		}

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS binds to this through bindings.
	 *
	 * @param value {NrForm | undefined}
	 */
	set bindNrModel (value) {

		if (this[PRIVATE.nrModel] !== value) {

			this[PRIVATE.nrModel] = value;

			nrLog.trace(`Model changed as: `, value);

			this._updateItems();

			this._calculateDimensionsWhenVisible();

		}

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS binds to this through bindings.
	 *
	 * @returns {NrForm|undefined}
	 */
	get bindNrModel () {

		return this[PRIVATE.nrModel];

	}

	/**
	 *
	 */
	getRows () {
		return this[PRIVATE.items];
	}

	getId () {
		return this[PRIVATE.nrModel] ? this[PRIVATE.nrModel].id : undefined;
	}

	/**
	 * Returns the ID from NrFormItemObject
	 *
	 * @param item {NrFormItemObject}
	 * @returns {string}
	 * @private
	 */
	getColumnId (item) {

		return item.id;

	}

	/**
	 * Returns the ID from NrFormItemObject
	 *
	 * @param rowIndex {number}
	 * @returns {string}
	 * @private
	 */
	getRowId (rowIndex) {

		return `row-${this.getId()}-${rowIndex}`;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * Called from the template
	 *
	 * @param item {NrFormItemObject}
	 * @returns {NrComponentConfigObject}
	 */
	getColumnCompileConfig (item) {

		return item.config;

	}

	/**
	 *
	 * @private
	 */
	_updateItems () {

		this[PRIVATE.items] = _.map(
			this[PRIVATE.nrModel].content,
			(row, rowIndex) => _.map(row, (column, columnIndex) => {

				const config = NrModelUtils.getComponentConfig(column);

				return {
					id: `column-${ rowIndex }-${ columnIndex }`
					, model: column
					, config
				};

			})
		);

		nrLog.trace(`Internal items array updated: `, this[PRIVATE.items]);

	}

	/**
	 * Returns `true` if the component element has dimensions.
	 *
	 * @returns {boolean}
	 * @private
	 */
	_isVisible () {

		const parentElement = this.$element[0];
		return !!( parentElement.offsetHeight && parentElement.offsetWidth );

	}

	/**
	 *
	 * @private
	 */
	_calculateDimensions () {

		const parentElement = this.$element[0];
		const parentTotalHeight = parentElement.offsetHeight;
		const parentTotalWidth = parentElement.offsetWidth;

		if ( !parentTotalHeight || !parentTotalWidth ) {
			nrLog.trace(`${this.nrName}._calculateDimensions(): parent wasn't visible yet: ${parentTotalWidth} x ${parentTotalHeight}`);
			return;
		}

		nrLog.trace(`${this.nrName}._calculateDimensions(): parent is ${parentTotalWidth} x ${parentTotalHeight}`);

		let maxRowHeight = 0;

		let maxColumnWidth = [];

		_.forEach(this[PRIVATE.items], (row, rowIndex) => {

			const rowElement = parentElement.querySelector(`#${this.getRowId(rowIndex)}`);
			const rowTotalHeight = rowElement && rowElement.offsetHeight || 0;
			const rowTotalWidth = rowElement && rowElement.offsetWidth || 0;

			nrLog.trace(`${this.nrName}._calculateDimensions(): row#${rowIndex} is ${rowTotalWidth} x ${rowTotalHeight}`);

			if (maxRowHeight < rowTotalHeight) {
				maxRowHeight = rowTotalHeight;
			}

			while ( row.length >= 1 && maxColumnWidth.length < row.length ) {
				maxColumnWidth.push(0);
			}

			_.forEach(row, (column, columnIndex) => {

				const columnElement = parentElement.querySelector(`#${this.getColumnId(column)}`);
				const columnTotalHeight = columnElement ? columnElement.offsetHeight : 0;
				const columnTotalWidth = columnElement ? columnElement.offsetWidth : 0;

				nrLog.trace(`${this.nrName}._calculateDimensions(): row#${rowIndex}/column#${columnIndex} is ${columnTotalWidth} x ${columnTotalHeight}`);

				if (maxColumnWidth[columnIndex] < columnTotalWidth) {
					maxColumnWidth[columnIndex] = columnTotalWidth;
				}

			});

		});

		nrLog.trace(`${this.nrName}._calculateDimensions(): maxRowHeight is ${maxRowHeight}`);
		nrLog.trace(`${this.nrName}._calculateDimensions(): maxColumnWidths are ${maxColumnWidth}`);

		this._buildRowHeights(parentTotalHeight, maxRowHeight);
		this._buildColumnWidths(parentTotalWidth, maxColumnWidth);
		this._buildRowStyles();
		this._buildColumnStyles();

	}

	/**
	 *
	 * @param parentTotalHeight {number}
	 * @param maxRowHeight {number}
	 * @private
	 */
	_buildRowHeights (parentTotalHeight, maxRowHeight) {

		const rowCount = this[PRIVATE.items].length;

		this[PRIVATE.rowHeights] = _.map(this[PRIVATE.items], (row, rowIndex) => {

			const rowHeights = _.get(this[PRIVATE.nrModel], 'rows');

			let height = rowHeights && rowIndex < rowHeights.length ? rowHeights[rowIndex] : undefined;

			if (height === "auto") {

				return rowCount ? Math.round(parentTotalHeight / rowCount ) : maxRowHeight;

			} else {

				return _.isNumber(height) ? Math.round(parentTotalHeight * height) : maxRowHeight;

			}

		});

		nrLog.trace(`${this.nrName}._buildRowHeights(): rowHeights as ${ this[PRIVATE.rowHeights] }`);

	}

	/**
	 *
	 * @param parentTotalWidth {number}
	 * @param maxColumnWidth {Array.<number>}
	 * @private
	 */
	_buildColumnWidths (parentTotalWidth, maxColumnWidth) {

		const columnCount = maxColumnWidth.length;

		this[PRIVATE.columnWidths] = _.map(maxColumnWidth, (columnWidth, columnIndex) => {

			const columnWidths = _.get(this[PRIVATE.nrModel], 'columns');

			let width = columnWidths && columnIndex < columnWidths.length ? columnWidths[columnIndex] : undefined;

			if (width === "auto") {

				return columnCount ? Math.round(parentTotalWidth / columnCount) : maxColumnWidth[columnIndex];

			} else {

				return _.isNumber(width) ? Math.round(parentTotalWidth * width) : maxColumnWidth[columnIndex];

			}

		});

		nrLog.trace(`${this.nrName}._buildColumnWidths(): columnWidths as ${ this[PRIVATE.columnWidths] }`);

	}

	/**
	 * Builds `this[PRIVATE.rowStyles]` from `this[PRIVATE.rowHeights]`
	 *
	 * @private
	 */
	_buildRowStyles () {

		this[PRIVATE.rowStyles] = _.map(
			this[PRIVATE.rowHeights],
			height => height ? {height: `${ height }px`} : {}
		);

	}

	/**
	 * Builds `this[PRIVATE.columnWidths]` from `this[PRIVATE.columnStyles]`
	 *
	 * @private
	 */
	_buildColumnStyles () {

		this[PRIVATE.columnStyles] = _.map(
			this[PRIVATE.columnWidths],
			width => width ? {width: `${ width }px`} : {}
		);

	}

	/**
	 *
	 * @param rowIndex {number}
	 * @returns {{height: (string|undefined)}}
	 */
	getRowStyles (rowIndex) {

		return rowIndex < this[PRIVATE.rowStyles].length ? this[PRIVATE.rowStyles][rowIndex] : undefined;

	}

	/**
	 *
	 * @param columnIndex {number}
	 * @returns {{width: (string|undefined)}}
	 */
	getColumnStyles (columnIndex) {

		return columnIndex < this[PRIVATE.columnStyles].length ? this[PRIVATE.columnStyles][columnIndex] : undefined;

	}

}
