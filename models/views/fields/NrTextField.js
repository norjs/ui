import _ from 'lodash';
import NrField from "./NrField";
import NrObjectType from "../../NrObjectType";
import NrIcon from "../../NrIcon";

/**
 *
 */
export class NrTextField extends NrField {

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
     * @param [name] {string}
     * @param [label] {string}
     * @param [icon] {NrIcon}
     */
    constructor ({
        name = undefined
        , label = undefined
        , icon = undefined
    } = {}) {

        if ( name !== undefined && !_.isString(name) ) {
            throw new TypeError(`new ${NrTextField.nrName}(): name invalid: "${name}"`);
        }

        if ( label !== undefined && !_.isString(label) ) {
            throw new TypeError(`new ${NrTextField.nrName}(): label invalid: "${label}"`);
        }

        if ( icon !== undefined && !(icon instanceof NrIcon) ) {
            throw new TypeError(`new ${NrTextField.nrName}(): icon invalid: "${icon}"`);
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

        /**
         *
         * @member {NrIcon|undefined}
         * @protected
         */
        this._icon = icon;

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
     * @returns {NrIcon}
     */
    get icon () {
        return this._icon;
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
            type: this.type
            , label: this._label
            , name: this._name
            , icon: !_.isNil(this._icon) ? this._icon.valueOf() : null
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
     * @returns {NrTextField}
     */
    static parseValue (value) {

        if ( !value ) {
            throw new TypeError(`${this.nrName}.parseValue(): value was not defined`);
        }

        if ( value instanceof NrTextField ) {
            return value;
        }

        const {
            type
            , name
            , label
            , icon
        } = value;

        if ( type !== NrObjectType.TEXT_FIELD ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        return new NrTextField({
            name    : !_.isNil(name)  ? name                    : undefined
            , label : !_.isNil(label) ? label                   : undefined
            , icon  : !_.isNil(icon)  ? NrIcon.parseValue(icon) : undefined
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrTextField;
