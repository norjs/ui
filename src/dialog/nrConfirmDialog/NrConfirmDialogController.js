import _ from 'lodash';
import LogUtils from "@norjs/utils/Log";

const nrLog = LogUtils.getLogger('nrConfirmDialogController');

/**
 *
 * @enum {Symbol}
 * @readonly
 */
const PRIVATE = {
	model: Symbol('_model'),
	nrRequestService: Symbol('_nrRequestService')
};

export class NrConfirmDialogController {

	static getBindings () {
		return {
			model: "<nrModel"
		};
	}

	/**
	 * @param nrRequestService {NrRequestService}
	 * @ngInject
	 */
	constructor (nrRequestService) {

		/**
		 *
		 * @member {NrRequestService}
		 */
		this[PRIVATE.nrRequestService] = nrRequestService;

		/**
		 *
		 * @member {undefined}
		 */
		this[PRIVATE.model] = undefined;

	}

	/**
	 *
	 * @param value {NrConfirmDialog | undefined}
	 */
	set model (value) {

		this[PRIVATE.model] = value;

	}

	/**
	 *
	 * @returns {NrConfirmDialog|undefined}
	 */
	get model () {

		return this[PRIVATE.model];

	}

	/**
	 *
	 * @returns {angular.IPromise}
	 */
	executeAction () {

		return this[PRIVATE.nrRequestService].executeRequest( this[PRIVATE.model].action );

	}

}
