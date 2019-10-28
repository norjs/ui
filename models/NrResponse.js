import NrObjectType from "./NrObjectType";
import NrModelUtils from "../utils/NrModelUtils";

/**
 *
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

        if ( value.type !== NrObjectType.RESPONSE ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${value.type}"`);
        }

        return new NrResponse({
            payload: NrModelUtils.parseModel(value.payload)
        });

    }

}

export default NrResponse;