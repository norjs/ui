import _ from "lodash";
import NrObjectType from "./NrObjectType";
import "./NrModel";
import NrModelUtils from "../utils/NrModelUtils";

/**
 * This is a data model for an nrEvent.
 *
 * @implements {NrModel}
 */
export class NrEvent {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.EVENT;
    }

    /**
     *
     * @returns {typeof NrEvent}
     */
    get Class () {
        return NrEvent;
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
     * @param [name] {string}
     * @param [payload] {*|undefined}
     */
    constructor ({
        name = undefined,
        payload = undefined
    } = {}) {

        if ( !_.isString(name) ) {
            throw new TypeError(`new ${NrEvent.nrName}(): name invalid: "${name}"`);
        }

        /**
         *
         * @member {string}
         * @protected
         */
        this._name = name;

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
        return `${NrObjectType.EVENT}`;
    }

    /**
     *
     * @returns {string}
     */
    get name () {
        return this._name;
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
     * @param modelValue {*}
     * @returns {NrEvent}
     */
    static parseValue (modelValue) {

        if ( !modelValue ) {
            throw new TypeError(`${this.nrName}.parseValue(): modelValue was not defined`);
        }

        if ( modelValue instanceof NrEvent ) {
            return modelValue;
        }

        const {
            type
            , name
            , payload
        } = modelValue;

        if ( !_.startsWith(type, `${NrObjectType.EVENT}:`) ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        return new NrEvent({
            name    : !_.isNil(name)    ? name                                                                                      : undefined,
            payload : !_.isNil(payload) ? (NrModelUtils.isModel(payload) ? NrModelUtils.parseValue(payload) : _.cloneDeep(payload)) : undefined
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrEvent;
