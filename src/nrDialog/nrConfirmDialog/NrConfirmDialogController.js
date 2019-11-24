import _ from 'lodash';
import LogUtils from "@norjs/utils/Log";

// noinspection JSUnusedLocalSymbols
const nrLog = LogUtils.getLogger('nrConfirmDialogController');

/**
 *
 * @enum {Symbol}
 * @readonly
 */
const PRIVATE = {
	nrModel: Symbol('_nrModel')
	, acceptAction: Symbol('_acceptAction')
	, cancelAction: Symbol('_cancelAction')
};

export class NrConfirmDialogController {

	static getBindings () {
		return {
			model: "<nrModel"
			, acceptAction: "&?nrAccept"
			, cancelAction: "&?nrCancel"
		};
	}

	static get $inject () {
		if (this._inject) return this._inject;
		return [];
	}
	static set $inject (value) {
		this._inject = value;
	}

	/**
	 * @ngInject
	 */
	constructor () {
		'ngInject';

		/**
		 *
		 * @member {NrConfirmDialog | undefined}
		 */
		this[PRIVATE.nrModel] = undefined;

		/**
		 *
		 * @member {Function|undefined}
		 */
		this[PRIVATE.acceptAction] = undefined;

		/**
		 *
		 * @member {Function|undefined}
		 */
		this[PRIVATE.cancelAction] = undefined;

	}

	// noinspection JSUnusedGlobalSymbols
	$onDestroy () {

		this[PRIVATE.nrModel] = undefined;
		this[PRIVATE.acceptAction] = undefined;
		this[PRIVATE.cancelAction] = undefined;

	}

	/**
	 *
	 * @param value {NrConfirmDialog | undefined}
	 */
	set model (value) {

		if (this[PRIVATE.nrModel] !== value) {

			this[PRIVATE.nrModel] = value;

			nrLog.trace(`Model changed as: `, value);

		}

	}

	/**
	 *
	 * @returns {NrConfirmDialog|undefined}
	 */
	get model () {

		return this[PRIVATE.nrModel];

	}

	/**
	 *
	 * @returns {boolean}
	 */
	hasIconValue () {

		return !!(this[PRIVATE.nrModel] && this[PRIVATE.nrModel].icon && this[PRIVATE.nrModel].icon.value);

	}

	/**
	 *
	 * @returns {NrIconValue|string|undefined}
	 */
	getIconValue () {

		return this[PRIVATE.nrModel] && this[PRIVATE.nrModel].icon ? this[PRIVATE.nrModel].icon.value : undefined;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS binding uses this.
	 *
	 * @param value {Function | undefined}
	 */
	set acceptAction (value) {

		this[PRIVATE.acceptAction] = value;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS binding uses this.
	 *
	 * @returns {Function|undefined}
	 */
	get acceptAction () {

		return this[PRIVATE.acceptAction];

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS binding uses this.
	 *
	 * @param value {Function | undefined}
	 */
	set cancelAction (value) {

		this[PRIVATE.cancelAction] = value;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS binding uses this.
	 *
	 * @returns {Function|undefined}
	 */
	get cancelAction () {

		return this[PRIVATE.cancelAction];

	}

	/**
	 *
	 * @returns {boolean}
	 */
	hasCancelAction () {
		return _.isFunction(this[PRIVATE.cancelAction]);
	}

	/**
	 *
	 * @returns {boolean}
	 */
	hasAcceptAction () {
		return _.isFunction(this[PRIVATE.acceptAction]);
	}

	/**
	 *
	 */
	accept () {

		if (_.isFunction(this[PRIVATE.acceptAction])) {

			nrLog.trace(`Accept clicked`);

			this[PRIVATE.acceptAction]({
				nrModel: this[PRIVATE.nrModel]
			});

		} else {

			nrLog.warn(`No accept callback.`);

		}

	}

	/**
	 *
	 */
	cancel () {

		nrLog.trace(`Cancel clicked`);

		if (_.isFunction(this[PRIVATE.cancelAction])) {

			this[PRIVATE.cancelAction]({
				nrModel  : this[PRIVATE.nrModel]
			});

		} else {

			nrLog.warn(`No cancel callback.`);

		}

	}

}
