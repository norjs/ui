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
	model: Symbol('_model')
	, okAction: Symbol('_okAction')
	, cancelAction: Symbol('_cancelAction')
};

export class NrConfirmDialogController {

	static getBindings () {
		return {
			model: "<nrModel"
			, okAction: "&?nrOkAction"
			, cancelAction: "&?nrCancelAction"
		};
	}

	/**
	 * @ngInject
	 */
	constructor () {

		/**
		 *
		 * @member {NrConfirmDialog | undefined}
		 */
		this[PRIVATE.model] = undefined;

		/**
		 *
		 * @member {Function|undefined}
		 */
		this[PRIVATE.okAction] = undefined;

		/**
		 *
		 * @member {Function|undefined}
		 */
		this[PRIVATE.cancelAction] = undefined;

	}

	$onDestroy () {

		this[PRIVATE.model] = undefined;
		this[PRIVATE.okAction] = undefined;
		this[PRIVATE.cancelAction] = undefined;

	}

	/**
	 *
	 * @param value {NrConfirmDialog | undefined}
	 */
	set model (value) {

		if (this[PRIVATE.model] !== value) {

			this[PRIVATE.model] = value;

			nrLog.trace(`Model changed as: `, value);

		}

	}

	/**
	 *
	 * @returns {NrConfirmDialog|undefined}
	 */
	get model () {

		return this[PRIVATE.model];

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS binding uses this.
	 *
	 * @param value {Function | undefined}
	 */
	set okAction (value) {

		this[PRIVATE.okAction] = value;

	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * AngularJS binding uses this.
	 *
	 * @returns {Function|undefined}
	 */
	get okAction () {

		return this[PRIVATE.okAction];

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
	 */
	ok () {

		if (_.isFunction(this[PRIVATE.okAction])) {

			nrLog.trace(`OK clicked`);

			this[PRIVATE.okAction]({
				nrModel: this[PRIVATE.model],
				nrAction: this[PRIVATE.model] && this[PRIVATE.model].action ? this[PRIVATE.model].action : undefined
			});

		} else {

			nrLog.warn(`No OK callback.`);

		}

	}

	/**
	 *
	 */
	cancel () {

		nrLog.trace(`Cancel clicked`);

		if (_.isFunction(this[PRIVATE.cancelAction])) {

			this[PRIVATE.cancelAction]({
				nrModel  : this[PRIVATE.model]
			});

		} else {

			nrLog.warn(`No cancel callback.`);

		}

	}

}
