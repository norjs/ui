import _ from "lodash";
import NrObjectType from "./NrObjectType";
import NrModelUtils from "../utils/NrModelUtils";
import NrSession from "./NrSession";

/**
 * Available request methods
 *
 * @enum {string}
 * @readonly
 */
export const NrRequestMethod = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
};

/**
 * This is a data model for a (HTTP) request.
 */
export class NrRequest {

    /**
     *
     * @returns {typeof Method}
     */
    static get Method () {
        return NrRequestMethod;
    }

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.REQUEST;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     *
     * @returns {string}
     */
    get nrName () {
        return this.Class.nrName;
    }

    /**
     *
     * @returns {typeof NrRequest}
     */
    get Class () {
        return NrRequest;
    }

    /**
     *
     * @param href {string}
     * @param method {NrRequestMethod}
     * @param session {NrSession}
     * @param params {Object}
     * @param payload {*}
     */
    constructor ({
        href = undefined,
        method = NrRequestMethod.GET,
        session = undefined,
        params = undefined,
        payload = undefined
    } = {}) {

        if ( href !== undefined && !_.isString(href) ) {
            throw new TypeError(`new ${NrRequest.nrName}(): href invalid: "${href}"`);
        }

        // FIXME: This should test if method exists
        if ( method !== undefined && !_.isString(method) ) {
            throw new TypeError(`new ${NrRequest.nrName}(): method invalid: "${method}"`);
        }

        if ( session !== undefined && !(session instanceof NrSession) ) {
            throw new TypeError(`new ${NrRequest.nrName}(): session invalid: "${session}"`);
        }

        if ( params !== undefined && !_.isPlainObject(params) ) {
            throw new TypeError(`new ${NrRequest.nrName}(): params not plain object: "${params}"`);
        }

        /**
         *
         * @member {string|undefined}
         * @protected
         */
        this._href = href;

        /**
         *
         * @member {NrRequestMethod|undefined}
         * @protected
         */
        this._method = method;

        /**
         *
         * @member {NrSession|undefined}
         * @protected
         */
        this._session = session;

        /**
         *
         * @member {Object|undefined}
         * @protected
         */
        this._params = Object.freeze(params);

        /**
         *
         * @member {*}
         * @private
         */
        this._payload = Object.freeze(payload);

    }

    /**
     *
     * @returns {string}
     */
    get type () {

        if (this._payload && this._payload.type) {
            return `${NrObjectType.REQUEST}:${this._method}:${this._payload.type}`;
        }

        return `${NrObjectType.REQUEST}:${this._method}`;

    }

    /**
     *
     *
     * @returns {string|undefined}
     */
    get href () {
        return this._href;
    }

    /**
     *
     *
     * @returns {string|undefined}
     */
    get method () {
        return this._method;
    }

    /**
     *
     *
     * @returns {NrSession|undefined}
     */
    get session () {
        return this._session;
    }

    /**
     *
     * @returns {Object}
     */
    get params () {
        return this._params;
    }

    /**
     *
     * @returns {*}
     */
    get payload () {
        return this._payload;
    }

    /**
     *
     * @returns {Object}
     */
    valueOf () {
        return {
            type: this.type,
            href: this._href,
            method: this._method,
            session: this._session ? this._session.valueOf() : null,
            params: this._params ? this._params : null,
            payload: this._payload ? NrModelUtils.valueOf(this._payload) : null
        };
    }

    /**
     *
     * @returns {Object}
     */
    toJSON () {
        return this.valueOf();
    }

    /**
     *
     * @param value {*}
     * @returns {NrRequest}
     */
    static parseValue (value) {

        // FIXME: Implement type checks

        const {href, method, session, params, payload} = value;

        return new NrRequest({
            href,
            method,
            session: NrSession.parseValue(session),
            params,
            payload: NrModelUtils.parseValue(payload)
        });

    }

}

export default NrRequest;
