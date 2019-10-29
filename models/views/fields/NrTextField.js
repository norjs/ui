import _ from 'lodash';
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

        if ( !value ) {
            throw new TypeError(`${this.nrName}.parseValue(): value was not defined`);
        }

        if ( value instanceof NrTextField) {
            return value;
        }

        const { type, name, label } = value;

        if ( type !== NrObjectType.TEXT_FIELD ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        return new NrTextField({
            name  : !_.isNil(name)  ? name  : undefined,
            label : !_.isNil(label) ? label : undefined
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrTextField;
