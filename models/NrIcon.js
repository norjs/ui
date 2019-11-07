import _ from "lodash";
import NrObjectType from "./NrObjectType";
import "./NrModel";
import NrIconValue from "./NrIconValue";

/**
 * This is a data model for an nrIcon.
 *
 * @implements {NrModel}
 */
export class NrIcon {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.ICON;
    }

    /**
     *
     * @returns {typeof NrIconValue}
     */
    static get Value () {
        return NrIconValue;
    }

    /**
     *
     * @returns {typeof NrIcon}
     */
    get Class () {
        return NrIcon;
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
     * @param [value] {NrIconValue|string}
     */
    constructor ({
        value = undefined
    } = {}) {

        if ( !_.isString(value) ) {
            throw new TypeError(`new ${NrIcon.nrName}(): value invalid: "${value}"`);
        }

        /**
         *
         * @member {string|undefined}
         * @protected
         */
        this._value = value;

    }

    /**
     *
     * @returns {string}
     */
    get type () {
        return `${NrObjectType.ICON}:${this._value}`;
    }

    /**
     *
     * @returns {NrIconValue|string}
     */
    get value () {
        return this._value;
    }

    /**
     *
     * @returns {Object}
     */
    valueOf () {
        return {
            type: this.type
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
     * @returns {NrIcon}
     */
    static parseValue (modelValue) {

        if ( !modelValue ) {
            throw new TypeError(`${this.nrName}.parseValue(): modelValue was not defined`);
        }

        if ( modelValue instanceof NrIcon ) {
            return modelValue;
        }

        const { type } = modelValue;

        if ( !_.startsWith(type, `${NrObjectType.ICON}:`) ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        const value = _.split(type, ':')[1];

        return new NrIcon({
            value: !_.isNil(value) ? value : undefined
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrIcon;
