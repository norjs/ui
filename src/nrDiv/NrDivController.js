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
	, updateItems             : Symbol('_updateItems')
	, ngFormController        : Symbol('_ngForm')
	, fieldControllers        : Symbol('_fieldControllers')
	, getFieldValues          : Symbol('_getFieldValues')
	, getItemId               : Symbol('_getItemId')
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
export class NrDivController {

	/**
	 *
	 * @returns {NrTag|string}
	 */
	static get nrName () {
		return NrTag.DIV;
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
	 * @returns {typeof NrDivController}
	 */
	get Class () {
		return NrDivController;
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

	/**
	 * @ngInject
	 */
	constructor () {

		/**
		 *
		 * @member {NrForm | undefined}
		 */
		this[PRIVATE.nrModel] = undefined;

		/**
		 *
		 * @member {Array | undefined}
		 */
		this[PRIVATE.items] = [];

	}

	// noinspection JSUnusedGlobalSymbols
	$onDestroy () {

		this[PRIVATE.nrModel] = undefined;
		this[PRIVATE.items] = undefined;

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

			this[PRIVATE.updateItems]();

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
	 * @returns {Array.<NrFormItemObject>}
	 */
	getItems () {
		return this[PRIVATE.items];
	}

	/**
	 *
	 * @param item {NrFormItemObject}
	 * @param index {number}
	 * @returns {string}
	 * @private
	 */
	getItemId (item, index) {

		return item && item.id !== undefined ? item.id : index;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 *
	 * @param item {NrFormItemObject}
	 * @returns {NrModel}
	 * @private
	 */
	getItemModel (item) {

		return item.model;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * Called from the template
	 *
	 * @param item {NrFormItemObject}
	 * @returns {NrComponentConfigObject}
	 */
	getItemCompileConfig (item) {

		return item.config;

	}

	/**
	 *
	 * @private
	 */
	[PRIVATE.updateItems]() {

		this[PRIVATE.items] = _.map(
			this[PRIVATE.nrModel].content,
			item => {

				const config = NrModelUtils.getComponentConfig(item);

				return {
					id: this[PRIVATE.getItemId](item)
					, model: item
					, config
				};

			});

		nrLog.trace(`Internal items array updated: `, this[PRIVATE.items]);

	}

	/**
	 *
	 * @param item {NrModel}
	 * @private
	 */
	[PRIVATE.getItemId] (item) {

		// FIXME: We need an interface for unique id in NrModel
		return item.id || item.name;

	}

}
