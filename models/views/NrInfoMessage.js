import _ from "lodash";
import NrView from "./NrView";
import NrObjectType from "../NrObjectType";

/**
 *
 */
export class NrInfoMessage extends NrView {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.INFO_MESSAGE;
    }

    /**
     *
     * @returns {typeof NrInfoMessage}
     */
    get Class () {
        return NrInfoMessage;
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
     * @param label {string}
     */
    constructor ({
        label = undefined
    } = {}) {

        if ( label !== undefined && !_.isString(label) ) {
            throw new TypeError(`new ${NrInfoMessage.nrName}(): label invalid: "${label}"`);
        }

        super();

        /**
         *
         * @member {string|undefined}
         * @protected
         */
        this._label = label;

    }

    /**
     *
     * @returns {string}
     */
    get type () {
        return NrObjectType.INFO_MESSAGE;
    }

    /**
     *
     * @returns {string}
     */
    get label () {
        return this._label;
    }

    /**
     *
     * @returns {Object}
     */
    valueOf () {
        return {
            type: this.type,
            label: this._label
        };
    }

    /**
     *
     * @param value {*}
     * @returns {NrInfoMessage}
     */
    static parseValue (value) {

        if ( !value ) {
            throw new TypeError(`${this.nrName}.parseValue(): value was not defined`);
        }

        if ( value instanceof NrInfoMessage) {
            return value;
        }

        const { type, label } = value;

        if ( type !== NrObjectType.INFO_MESSAGE ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        return new NrInfoMessage({
            label: !_.isNil(label) ? label : undefined
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrInfoMessage;
