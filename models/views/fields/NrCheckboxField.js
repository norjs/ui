import _ from 'lodash';
import NrField from "./NrField";
import NrObjectType from "../../NrObjectType";
import NrIcon from "../../NrIcon";

/**
 *
 * @implements {NrModel}
 */
export class NrCheckboxField extends NrField {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.CHECKBOX_FIELD;
    }

    /**
     *
     * @returns {typeof NrCheckboxField}
     */
    get Class () {
        return NrCheckboxField;
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
     * @param [value] {boolean}
     * @param [readOnly] {boolean}
     */
    constructor ({
        name = undefined
        , label = undefined
        , icon = undefined
        , value = undefined
        , readOnly = undefined
    } = {}) {

        if ( name !== undefined && !_.isString(name) ) {
            throw new TypeError(`new ${NrCheckboxField.nrName}(): name invalid: "${name}"`);
        }

        if ( label !== undefined && !_.isString(label) ) {
            throw new TypeError(`new ${NrCheckboxField.nrName}(): label invalid: "${label}"`);
        }

        if ( icon !== undefined && !(icon instanceof NrIcon) ) {
            throw new TypeError(`new ${NrCheckboxField.nrName}(): icon invalid: "${icon}"`);
        }

        if ( readOnly !== undefined && !_.isBoolean(readOnly) ) {
            throw new TypeError(`new ${NrCheckboxField.nrName}(): readOnly invalid: "${readOnly}"`);
        }

        if ( value !== undefined && !_.isBoolean(value) ) {
            throw new TypeError(`new ${NrCheckboxField.nrName}(): value invalid: "${value}"`);
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

        /**
         *
         * @member {string|undefined}
         * @protected
         */
        this._value = value;

        /**
         *
         * @member {boolean}
         * @protected
         */
        this._readOnly = !!readOnly;

    }

    /**
     *
     * @returns {string}
     */
    get type () {
        return NrObjectType.CHECKBOX_FIELD;
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
     * @returns {string|undefined}
     */
    get value () {
        return this._value;
    }

    /**
     *
     * @returns {boolean}
     */
    get readOnly () {
        return this._readOnly;
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
            , value       : _.isBoolean(this._value) ? this._value : undefined
            , readOnly    : this._readOnly ? true : undefined
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
     * @param objValue {*}
     * @returns {NrCheckboxField}
     */
    static parseValue (objValue) {

        if ( !objValue ) {
            throw new TypeError(`${this.nrName}.parseValue(): objValue was not defined`);
        }

        if ( objValue instanceof NrCheckboxField ) {
            return objValue;
        }

        const {
            type
            , name
            , label
            , icon
            , value
            , readOnly
        } = objValue;

        if ( type !== NrObjectType.CHECKBOX_FIELD ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        return new NrCheckboxField({
            name          : !_.isNil(name)      ? name                    : undefined
            , label       : !_.isNil(label)     ? label                   : undefined
            , icon        : !_.isNil(icon)      ? NrIcon.parseValue(icon) : undefined
            , value       : !_.isNil(value)       ? value                 : undefined
            , readOnly    : !_.isNil(readOnly)    ? !!readOnly            : undefined
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrCheckboxField;
