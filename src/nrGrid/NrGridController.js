import _ from 'lodash';
import LogUtils from "@norjs/utils/Log";
import NrTag from "../NrTag";
import NrModelUtils from "../../utils/NrModelUtils";
import angular from "angular";

// noinspection JSUnusedLocalSymbols
const nrLog = LogUtils.getLogger('NrGridController');

/**
 * The limit which to consider screen to be too small in pixels
 *
 * @type {number}
 */
const SMALL_SCREEN_WIDTH_LIMIT = 500;

/**
 *
 * @type {number}
 */
const WINDOW_RESIZE_TIMEOUT = 0;

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
	, columnVisibleOnSmallScreen : Symbol('_columnVisibleOnSmallScreen')
	, rowStyles                  : Symbol('_rowStyles')
	, columnStyles               : Symbol('_columnStyles')
	, calculationHasBeenDelayed  : Symbol('_calculationHasBeenDelayed')
	, originalMaxRowHeight       : Symbol('_originalMaxRowHeight')
	, originalMaxColumnWidths    : Symbol('_originalMaxColumnWidths')
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
	 * @param $window {angular.IWindowService}
	 * @ngInject
	 */
	constructor (
		$scope,
		$element,
		$window,
		$timeout
	) {
		'ngInject';

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
		 * @member {angular.IWindowService}
		 * @private
		 */
		this.$window = $window;

		/**
		 *
		 * @member {angular.ITimeoutService}
		 * @private
		 */
		this.$timeout = $timeout;

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
		 * @member {number}
		 * @private
		 */
		this[PRIVATE.originalMaxRowHeight] = undefined;

		/**
		 *
		 * @member {Array<string|number>}
		 * @private
		 */
		this[PRIVATE.originalMaxColumnWidths] = undefined;

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
		 * @member {angular.IPromise|undefined}
		 * @private
		 */
		this[PRIVATE.calculationHasBeenDelayed] = undefined;

		/**
		 *
		 * @member {Array.<boolean>}
		 * @private
		 */
		this[PRIVATE.columnVisibleOnSmallScreen] = undefined;

		/**
		 *
		 * @member {boolean}
		 * @private
		 */
		this._isDestroyed = false;

		/**
		 *
		 * @member {number|undefined}
		 * @private
		 */
		this._windowWidth = undefined;

		/**
		 *
		 * @member {angular.IPromise}
		 * @private
		 */
		this._resizeTimeout = undefined;

		/**
		 *
		 * @member {Function}
		 * @private
		 */
		this._resizeCallback = () => {
			if (this._isDestroyed) return;
			this._resizeWindowAction();
		};

	}

	/**
	 *
	 * @private
	 */
	_resizeWindowAction () {

		if (this._resizeTimeout) {
			this.$timeout.cancel(this._resizeTimeout);
		}

		this._resizeTimeout = this.$timeout( () => {

			if (this._isDestroyed) return;

			this._calculateDimensionsWhenVisible();

		}, WINDOW_RESIZE_TIMEOUT);

	}

	// noinspection JSUnusedGlobalSymbols
	$onDestroy () {

		this._isDestroyed = true;

		if (this._resizeTimeout) {
			this.$timeout.cancel(this._resizeTimeout);
			this._resizeTimeout = undefined;
		}

		if (this[PRIVATE.calculationHasBeenDelayed]) {
			this.$timeout.cancel(this[PRIVATE.calculationHasBeenDelayed]);
			this[PRIVATE.calculationHasBeenDelayed] = undefined;
		}

		angular.element(this.$window).off('resize', this._resizeCallback);

		this.$scope = undefined;
		this.$element = undefined;
		this.$window = undefined;
		this[PRIVATE.nrModel] = undefined;
		this[PRIVATE.items] = undefined;
		this._resizeCallback = undefined;

	}

	$postLink () {

		this._calculateDimensionsWhenVisible();

		angular.element(this.$window).bind('resize', this._resizeCallback);

		this.$scope.$watch( () => {
			const parentElement = this.$element[0];
			return parentElement && parentElement.offsetWidth ? parentElement.offsetWidth : undefined;
		}, () => this._resizeCallback());

	}

	_calculateDimensionsWhenVisible () {

		if (this._isVisible()) {

			this._calculateDimensions();

		} else {

			if (this[PRIVATE.calculationHasBeenDelayed]) {
				this.$timeout.cancel(this[PRIVATE.calculationHasBeenDelayed]);
				this[PRIVATE.calculationHasBeenDelayed] = undefined;
			}

			// Check dimensions at the start of next digest loop
			nrLog.trace(`_calculateDimensionsWhenVisible(): Delaying dimensions calculations to next digest loop because the element wasn't visible.`);
			this[PRIVATE.calculationHasBeenDelayed] = this.$timeout( () => {
				if (this._isDestroyed) return;
				this[PRIVATE.calculationHasBeenDelayed] = undefined;
				this._calculateDimensions();
			}, WINDOW_RESIZE_TIMEOUT);

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

		this._windowWidth = parentTotalWidth;

		if ( !parentTotalHeight || !parentTotalWidth ) {
			nrLog.trace(`_calculateDimensions(): parent wasn't visible yet: ${parentTotalWidth} x ${parentTotalHeight}`);
			return;
		}

		nrLog.trace(`_calculateDimensions(): parent is ${parentTotalWidth} x ${parentTotalHeight}`);

		let maxRowHeight = 0;

		let maxColumnWidth = [];

		if ( this[PRIVATE.originalMaxColumnWidths] === undefined ) {

			_.forEach(this[PRIVATE.items], (row, rowIndex) => {

				const rowElement = parentElement.querySelector(`#${this.getRowId(rowIndex)}`);
				const rowTotalHeight = rowElement && rowElement.offsetHeight || 0;
				const rowTotalWidth = rowElement && rowElement.offsetWidth || 0;

				nrLog.trace(`_calculateDimensions(): row#${rowIndex} is ${rowTotalWidth} x ${rowTotalHeight}`);

				if (maxRowHeight < rowTotalHeight) {
					maxRowHeight = rowTotalHeight;
				}

				while ( row.length >= 1 && maxColumnWidth.length < row.length ) {
					maxColumnWidth.push(0);
				}

				_.forEach(row, (column, columnIndex) => {

					const columnElement = angular.element(rowElement.querySelector(`#${this.getColumnId(column)}`)).children().eq(0)[0];
					const columnTotalHeight = columnElement ? columnElement.offsetHeight : 0;
					const columnTotalWidth = columnElement ? columnElement.offsetWidth : 0;

					nrLog.trace(`_calculateDimensions(): row#${rowIndex}/column#${columnIndex} is ${columnTotalWidth} x ${columnTotalHeight}`);

					if (maxColumnWidth[columnIndex] < columnTotalWidth) {
						maxColumnWidth[columnIndex] = columnTotalWidth;
					}

				});

			});

			this[PRIVATE.originalMaxRowHeight] = maxRowHeight;
			this[PRIVATE.originalMaxColumnWidths] = maxColumnWidth;

		} else {

			maxRowHeight = this[PRIVATE.originalMaxRowHeight];
			maxColumnWidth = _.map(this[PRIVATE.originalMaxColumnWidths], i => i);

		}

		nrLog.trace(`_calculateDimensions(): maxRowHeight is ${maxRowHeight}`);

		nrLog.trace(`_calculateDimensions(): maxColumnWidths are ${maxColumnWidth} (${ _.reduce(maxColumnWidth, (a, b) => a + b, 0) })`);

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

				return rowCount ? Math.floor(parentTotalHeight / rowCount ) : maxRowHeight;

			} else {

				return _.isNumber(height) ? Math.floor(parentTotalHeight * height) : maxRowHeight;

			}

		});

		nrLog.trace(`_buildRowHeights(): rowHeights as ${ this[PRIVATE.rowHeights] }`);

	}

	/**
	 *
	 * @param parentTotalWidth {number}
	 * @param maxColumnWidth {Array.<number>}
	 * @private
	 */
	_buildColumnWidths (parentTotalWidth, maxColumnWidth) {

		nrLog.trace(`_buildColumnWidths(): parentTotalWidth = ${parentTotalWidth}`);
		nrLog.trace(`_buildColumnWidths(): maxColumnWidth = ${maxColumnWidth}`);

		const columnCount = maxColumnWidth.length;
		nrLog.trace(`_buildColumnWidths(): columnCount = ${columnCount}`);

		let autoColumnCount = 0;

		const columnVisibleOnSmallScreen = [];

		const columnWidths = _.get(this[PRIVATE.nrModel], 'columns');
		nrLog.trace(`_buildColumnWidths(): nrModel.columns = ${columnWidths.join(' | ')}`);

		this[PRIVATE.columnWidths] = _.map(maxColumnWidth, (columnWidth, columnIndex) => {

			let visibleOnSmallScreen = true;
			let width = columnWidths && columnIndex < columnWidths.length ? columnWidths[columnIndex] : undefined;

			if ( _.isString(width) && width.length && width[0] === '-' ) {
				visibleOnSmallScreen = false;
				width = width.substr(1);
			}

			columnVisibleOnSmallScreen.push(visibleOnSmallScreen);

			if (width === "auto") {

				autoColumnCount += 1;

				const maxWidth = maxColumnWidth[columnIndex];

				if (columnCount) {

					let width = Math.floor(parentTotalWidth / columnCount);

					return width > maxWidth ? maxWidth : width;

				} else {

					return maxColumnWidth[columnIndex];

				}

			} else {

				return _.isNumber(width) ? Math.floor(parentTotalWidth * Math.abs(width) ) : maxColumnWidth[columnIndex];

			}

		});

		this[PRIVATE.columnVisibleOnSmallScreen] = columnVisibleOnSmallScreen;
		nrLog.trace(`_buildColumnWidths(): columnVisibleOnSmallScreen = ${ this[PRIVATE.columnVisibleOnSmallScreen] }`);

		let newTotalWidth = _.reduce(
			_.filter(this[PRIVATE.columnWidths], (c, i) => this.isColumnVisible(i)),
			(a, b) => a + b,
			0
		);

		nrLog.trace(`_buildColumnWidths(): columnWidths = ${ this[PRIVATE.columnWidths] } (${ newTotalWidth })`);

		if (newTotalWidth < parentTotalWidth) {

			const freeSpaceAmount = parentTotalWidth - newTotalWidth;

			const columnCount = _.filter(this[PRIVATE.columnWidths], (c, index) => this.isColumnVisible(index)).length;

			if (columnCount >= 1) {

				const autoEnabled = autoColumnCount >= 1;
				const appendCount = autoEnabled ? autoColumnCount : columnCount;
				const appendWidth = Math.floor(freeSpaceAmount / appendCount );

				nrLog.trace(`_buildColumnWidths(): We have total of ${freeSpaceAmount} pixels left to fill with ${appendCount} columns (${ appendWidth } px per column)`);

				this[PRIVATE.columnWidths] = _.map(this[PRIVATE.columnWidths], (columnWidth, columnIndex) => {

					const isVisible = this.isColumnVisible(columnIndex);

					if (!isVisible) {
						return 0;
					}

					if (!autoEnabled) {
						return columnWidth + appendWidth;
					}

					let width = columnWidths && columnIndex < columnWidths.length ? columnWidths[columnIndex] : undefined;

					if (width.length && width[0] === '-') {
						width = width.substr(1);
					}

					if (width === "auto") {
						return columnWidth + appendWidth;
					}

					return columnWidth;

				});

				newTotalWidth = _.reduce(_.filter(this[PRIVATE.columnWidths], (c, i) => this.isColumnVisible(i)), (a, b) => a + b, 0);

			}

		}

		if (newTotalWidth > parentTotalWidth) {

			nrLog.warn(`Warning! ._buildColumnWidths(): newTotalWidth ${newTotalWidth} is greater than parentTotalWidth ${parentTotalWidth}`);

		}

		nrLog.debug(`_buildColumnWidths(): ${ this[PRIVATE.columnWidths] } (${ newTotalWidth })`);

	}

	/**
	 * Builds `this[PRIVATE.rowStyles]` from `this[PRIVATE.rowHeights]`
	 *
	 * @private
	 */
	_buildRowStyles () {

		nrLog.trace(`._buildRowStyles(): rowHeights: `, this[PRIVATE.rowHeights]);

		this[PRIVATE.rowStyles] = _.map(
			this[PRIVATE.rowHeights],
			height => height ? {height: `${ height }px`} : {}
		);

		nrLog.debug(`._buildRowStyles(): `, this[PRIVATE.rowStyles]);

	}

	/**
	 * Builds `this[PRIVATE.columnWidths]` from `this[PRIVATE.columnStyles]`
	 *
	 * @private
	 */
	_buildColumnStyles () {

		nrLog.trace(`._buildColumnStyles(): columnWidths: `, this[PRIVATE.columnWidths]);

		this[PRIVATE.columnStyles] = _.map(
			this[PRIVATE.columnWidths],
			width => width ? {width: `${ width }px`} : {}
		);

		nrLog.debug(`._buildColumnStyles(): `, this[PRIVATE.columnStyles]);

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

	/**
	 *
	 * @param index {number}
	 * @returns {boolean}
	 */
	isColumnVisible (index) {

		if (this._windowWidth >= SMALL_SCREEN_WIDTH_LIMIT) {
			return true;
		}

		const columnVisibleOnSmallScreen = this[PRIVATE.columnVisibleOnSmallScreen];

		if (!columnVisibleOnSmallScreen) {
			return true;
		}

		if ( index >= columnVisibleOnSmallScreen.length ) {
			return true;
		}

		return columnVisibleOnSmallScreen[index];

	}

}
