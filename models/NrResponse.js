import _ from 'lodash';
import "./NrModel";
import NrObjectType from "./NrObjectType";
import NrModelUtils from "../utils/NrModelUtils";
import LogUtils from "@norjs/utils/Log";

/**
 *
 * @implements {NrModel}
 */
export class NrResponse {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.RESPONSE;
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
     * @returns {typeof Session}
     */
    get Class () {
        return NrResponse;
    }

    /**
     *
     * @param [id] {string} This should be same as request.id from NrRequest which this is a response to.
     * @param [version] {number}
     * @param [payload] {*}
     */
    constructor ({
        id,
        version = 0,
        payload = undefined
    } = {}) {

        if ( !(id && _.isString(id)) ) {
            throw new TypeError(`new ${NrResponse.nrName}(): id invalid: ${LogUtils.getAsString(id)}`);
        }

        if ( !_.isNumber(version) ) {
            throw new TypeError(`new ${NrResponse.nrName}(): version invalid: ${LogUtils.getAsString(version)}`);
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
        return `${NrObjectType.RESPONSE}:${this._payload.type}`;
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
            payload: NrModelUtils.valueOf(this._payload)
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
     * @returns {NrResponse}
     */
    static parseValue (value) {

        if ( !value ) {
            throw new TypeError(`${this.nrName}.parseValue(): value was not defined`);
        }

        if ( value instanceof NrResponse) {
            return value;
        }

        if ( !_.startsWith(value.type, NrObjectType.RESPONSE) ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${value.type}"`);
        }

        const {
            id
            , version
            , payload
        } = value;

        return new NrResponse({
            id      : id,
            version : version,
            payload : !_.isNil(payload) ? NrModelUtils.parseValue(payload) : undefined
        });

    }

}

export default NrResponse;
