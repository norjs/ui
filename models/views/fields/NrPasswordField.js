import NrView from "../NrView";
import NrObjectType from "../../NrObjectType";

/**
 *
 */
export class NrPasswordField extends NrView {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.PASSWORD_FIELD;
    }

    /**
     *
     * @returns {typeof NrPasswordField}
     */
    get Class () {
        return NrPasswordField;
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
            throw new TypeError(`new ${NrPasswordField.nrName}(): name invalid: "${name}"`);
        }

        if ( label !== undefined && !_.isString(label) ) {
            throw new TypeError(`new ${NrPasswordField.nrName}(): label invalid: "${label}"`);
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
        return NrObjectType.PASSWORD_FIELD;
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
     * @returns {NrPasswordField}
     */
    static parseValue (value) {

        if ( !value ) {
            throw new TypeError(`${this.nrName}.parseValue(): value was not defined`);
        }

        if ( value.type !== NrObjectType.PASSWORD_FIELD ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${value.type}"`);
        }

        return new NrPasswordField({
            name: value.name,
            label: value.label
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrPasswordField;
