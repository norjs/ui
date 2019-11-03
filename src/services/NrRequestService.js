import LogUtils from "@norjs/utils/Log";
import NrServiceName from "../NrServiceName";
import NrModelUtils from "../../utils/NrModelUtils";
import NrRequestHeader from "../../models/NrRequestHeader";

const nrLog = LogUtils.getLogger("NrRequestService");

const PRIVATE = {
    http: Symbol('_http')
    , q: Symbol('_q')
};

/**
 *
 * @type {string}
 */
let API_PATH_PREFIX = '/';

export class NrRequestService {

    /**
     *
     * @returns {string}
     */
    static get API_PATH_PREFIX () {
        return API_PATH_PREFIX;
    }

    /**
     *
     * @param value {string}
     */
    static set API_PATH_PREFIX (value) {

        if (!_.isString(value)) {
            throw new TypeError(`set ${this.nrName}.API_PATH_PREFIX: value not a string: ${LogUtils.getAsString(value)}`)
        }

        API_PATH_PREFIX = value;

    }

    get API_PATH_PREFIX () {
        return this.Class.API_PATH_PREFIX;
    }

    set API_PATH_PREFIX (value) {
        this.Class.API_PATH_PREFIX = value;
    }

    static get nrName () {
        return NrServiceName.REQUEST;
    }

    /**
     *
     * @returns {typeof NrRequestService}
     */
    get Class () {
        return NrRequestService;
    }

    get nrName () {
        return this.Class.nrName;
    }

    /**
     *
     * @param $http {angular.IHttpService}
     * @param $q {angular.IQService}
     * @ngInject
     */
    constructor (
        $http
        , $q
    ) {

        /**
         *
         * @member {angular.IHttpService}
         */
        this[PRIVATE.http] = $http;

        /**
         *
         * @member {angular.IQService}
         */
        this[PRIVATE.q] = $q;

    }

    /**
     *
     * @param request {NrRequest}
     * @returns {angular.IPromise}
     */
    executeRequest (request) {

        const {method, href, session, payload} = request;

        nrLog.trace(`Executing request ${method} ${href}`);

        let headers = {};

        if ( session && _.isString(session.id) ) {
            headers[NrRequestHeader.SESSION_ID] = session.id;
        }

        const options = {
            method: method,
            data: payload,
            headers: headers,
            url: `${API_PATH_PREFIX}${href}`
        };

        nrLog.trace(`Executing request ${LogUtils.getAsString(request)} with options ${LogUtils.getAsString(options)}`);

        return this[PRIVATE.http](options).then( (response) => {

            if (!response) {
                nrLog.debug(`response = `, response);
                throw new TypeError(`${this.nrName}.executeRequest: response was not defined`);
            }

            if (!response.data) {
                nrLog.debug(`response = `, response);
                throw new TypeError(`${this.nrName}.executeRequest: response.data was not defined`);
            }

            nrLog.trace(`response = `, response);

            return NrModelUtils.parseValue(response.data);

        }).catch(err => {

            nrLog.error(`Request failed: `, err);

            return this[PRIVATE.q].reject(err);

        });
    }

}

// noinspection JSUnusedGlobalSymbols
export default NrRequestService;
