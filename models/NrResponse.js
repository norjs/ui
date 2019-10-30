import _ from 'lodash';
import "./NrModel";
import NrObjectType from "./NrObjectType";
import NrModelUtils from "../utils/NrModelUtils";

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
     * @param payload {*}
     */
    constructor ({
        payload = undefined
    } = {}) {

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

        return new NrResponse({
            payload: !_.isNil(value.payload) ? NrModelUtils.parseModel(value.payload) : undefined
        });

    }

}

export default NrResponse;
