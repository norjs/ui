import _ from "lodash";
import "./NrModel";
import NrObjectType from "./NrObjectType";
import NrModelUtils from "../utils/NrModelUtils";
import NrSession from "./NrSession";
import LogUtils from "@norjs/utils/src/LogUtils";

/**
 * Available request methods
 *
 * @enum {string}
 * @readonly
 */
export const NrRequestMethod = {

    /**
     * @member {NrRequestMethod|string}
     */
    GET: 'get',

    /**
     * @member {NrRequestMethod|string}
     */
    POST: 'post',

    /**
     * @member {NrRequestMethod|string}
     */
    PUT: 'put',

    /**
     * @member {NrRequestMethod|string}
     */
    DELETE: 'delete'

};

/**
 * This is a data model for a (HTTP) request.
 *
 * @implements {NrModel}
 */
export class NrRequest {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.REQUEST;
    }

    /**
     *
     * @returns {typeof NrRequestMethod}
     */
    static get Method () {
        return NrRequestMethod;
    }

    /**
     *
     * @param method {string}
     */
    static parseMethod (method) {
        switch(_.toLower(_.trim(method))) {

            case "get"    : return NrRequestMethod.GET;
            case "post"   : return NrRequestMethod.POST;
            case "put"    : return NrRequestMethod.PUT;
            case "delete" : return NrRequestMethod.DELETE;

            default: throw new TypeError(`${this.nrName}.parseMethod(): method invalid: "${LogUtils.getAsString(method)}"`);

        }
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
     * @param [id] {string}
     * @param [version] {number}
     * @param [href] {string}
     * @param [method] {NrRequestMethod}
     * @param [session] {NrSession}
     * @param [params] {Object}
     * @param [payload] {*}
     */
    constructor ({
        id,
        version = 0,
        href = undefined,
        method = NrRequestMethod.GET,
        session = undefined,
        params = undefined,
        payload = undefined
    } = {}) {

        if ( id !== undefined && !(id && _.isString(id)) ) {
            throw new TypeError(`new ${NrRequest.nrName}(): id invalid: ${LogUtils.getAsString(id)}`);
        }

        if ( !_.isNumber(version) ) {
            throw new TypeError(`new ${NrRequest.nrName}(): version invalid: ${LogUtils.getAsString(version)}`);
        }

        if ( href !== undefined && !_.isString(href) ) {
            throw new TypeError(`new ${NrRequest.nrName}(): href invalid: ${LogUtils.getAsString(href)}`);
        }

        // FIXME: This should test if method exists
        if ( method !== undefined && !_.isString(method) ) {
            throw new TypeError(`new ${NrRequest.nrName}(): method invalid: ${LogUtils.getAsString(method)}`);
        }

        if ( session !== undefined && !(session instanceof NrSession) ) {
            throw new TypeError(`new ${NrRequest.nrName}(): session invalid: ${LogUtils.getAsString(session)}`);
        }

        if ( params !== undefined && !_.isPlainObject(params) ) {
            throw new TypeError(`new ${NrRequest.nrName}(): params not plain object: ${LogUtils.getAsString(params)}`);
        }

        /**
         *
         * @member {string}
         * @protected
         */
        this._id = id;

        /**
         *
         * @member {number}
         * @protected
         */
        this._version = version;

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
    get id () {
        return this._id;
    }

    /**
     *
     * @returns {number|undefined}
     */
    get version () {
        return this._version;
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
            id: this._id,
            version: this._version,
            href: this._href,
            method: this._method,
            session: this._session ? this._session.valueOf() : null,
            params: this._params ? this._params : null,
            payload: this._payload ? (NrModelUtils.isModel(this._payload) ? NrModelUtils.valueOf(this._payload) : _.cloneDeep(this._payload)) : null
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

        if ( !value ) {
            throw new TypeError(`${this.nrName}.parseValue(): value was not defined`);
        }

        if ( value instanceof NrRequest) {
            return value;
        }

        if ( !_.startsWith(value.type, NrObjectType.REQUEST) ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${value.type}"`);
        }

        const {
            href
            , id
            , version
            , method
            , session
            , params
            , payload
        } = value;

        return new NrRequest({
            id      : !_.isNil(id)      ? id       : undefined,
            version : version,
            href    : !_.isNil(href)    ? href     : undefined,
            method  : !_.isNil(method)  ? method   : undefined,
            params  : !_.isNil(params)  ? params   : undefined,
            session : !_.isNil(session) ? NrSession.parseValue(session)    : undefined,
            payload : !_.isNil(payload) ? (NrModelUtils.isModel(payload) ? NrModelUtils.parseValue(payload) : _.cloneDeep(payload)) : undefined
        });

    }

    /**
     *
     * @param model {NrRequest} The request model
     * @param payload {Object} The new payload value
     * @returns {NrRequest}
     */
    static copyWithModifiedPayload (model, payload) {

        let modifiedModelValue = model.valueOf();

        modifiedModelValue.payload = payload;

        modifiedModelValue.version += 1;

        return NrRequest.parseValue(modifiedModelValue);

    }

}

export default NrRequest;
