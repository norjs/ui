import NrView from "../NrView";
import NrObjectType from "../../NrObjectType";

/**
 *
 */
export class NrTextField extends NrView {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.TEXT_FIELD;
    }

    /**
     *
     * @returns {typeof NrTextField}
     */
    get Class () {
        return NrTextField;
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
     * @param name {string}
     * @param label {string}
     */
    constructor ({
        name = undefined,
        label = undefined
    } = {}) {

        if ( name !== undefined && !_.isString(name) ) {
            throw new TypeError(`new ${NrTextField.nrName}(): name invalid: "${name}"`);
        }

        if ( label !== undefined && !_.isString(label) ) {
            throw new TypeError(`new ${NrTextField.nrName}(): label invalid: "${label}"`);
        }

        super();

        /**
         *
         * @member {string|undefined}
         * @protected
         */
        this._name = name;

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
        return NrObjectType.TEXT_FIELD;
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
     * @returns {string}
     */
    get name () {
        return this._name;
    }

    /**
     *
     * @returns {Object}
     */
    valueOf () {
        return {
            type: this.type,
            label: this._label,
            name: this._name
        };
    }

    /**
     *
     * @param value {*}
     * @returns {NrTextField}
     */
    static parseValue (value) {

        // @TODO

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrTextField;
