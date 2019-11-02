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
		this[PRIVATE.acceptAction] = undefined;

		/**
		 *
		 * @member {Function|undefined}
		 */
		this[PRIVATE.cancelAction] = undefined;

	}

	$onDestroy () {

		this[PRIVATE.model] = undefined;
		this[PRIVATE.acceptAction] = undefined;
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
				nrModel: this[PRIVATE.model]
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
				nrModel  : this[PRIVATE.model]
			});

		} else {

			nrLog.warn(`No cancel callback.`);

		}

	}

}
