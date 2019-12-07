import _ from 'lodash';
import NrField from "./NrField";
import NrObjectType from "../../NrObjectType";
import NrIcon from "../../NrIcon";

/**
 *
 * @implements {NrModel}
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
     * @param [id] {string}
     * @param [name] {string}
     * @param [label] {string}
     * @param [placeholder] {string}
     * @param [icon] {NrIcon}
     * @param [value] {string}
     * @param [readOnly] {boolean}
     * @param [required] {boolean}
     */
    constructor ({
        id = undefined
        , name = undefined
        , label = undefined
        , placeholder = undefined
        , icon = undefined
        , value = undefined
        , readOnly = false
        , required = false
    } = {}) {

        if ( id !== undefined && !_.isString(id) ) {
            throw new TypeError(`new ${NrTextField.nrName}(): id invalid: "${id}"`);
        }

        if ( name !== undefined && !_.isString(name) ) {
            throw new TypeError(`new ${NrTextField.nrName}(): name invalid: "${name}"`);
        }

        if ( label !== undefined && !_.isString(label) ) {
            throw new TypeError(`new ${NrTextField.nrName}(): label invalid: "${label}"`);
        }

        if ( placeholder !== undefined && !_.isString(placeholder) ) {
            throw new TypeError(`new ${NrTextField.nrName}(): placeholder invalid: "${placeholder}"`);
        }

        if ( icon !== undefined && !(icon instanceof NrIcon) ) {
            throw new TypeError(`new ${NrTextField.nrName}(): icon invalid: "${icon}"`);
        }

        if ( !_.isBoolean(readOnly) ) {
            throw new TypeError(`new ${NrTextField.nrName}(): readOnly invalid: "${readOnly}"`);
        }

        if ( !_.isBoolean(required) ) {
            throw new TypeError(`new ${NrTextField.nrName}(): required invalid: "${required}"`);
        }

        if ( value !== undefined && !_.isString(value) ) {
            throw new TypeError(`new ${NrTextField.nrName}(): value invalid: "${value}"`);
        }

        super();

        /**
         *
         * @member {string|undefined}
         * @protected
         */
        this._id = id;

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
         * @member {string|undefined}
         * @protected
         */
        this._placeholder = placeholder;

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

        /**
         *
         * @member {boolean}
         * @protected
         */
        this._required = !!required;

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
    get placeholder () {
        return this._placeholder;
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
    get id () {
        return this._id;
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
     * @returns {boolean}
     */
    get required () {
        return this._required;
    }

    /**
     *
     * @returns {Object}
     */
    valueOf () {
        return {
            type: this.type
            , id: this._id
            , label: this._label
            , placeholder: this._placeholder
            , name: this._name
            , icon: !_.isNil(this._icon) ? this._icon.valueOf() : null
            , value       : !_.isNil(this._value) ? this._value : undefined
            , readOnly    : this._readOnly ? true : undefined
            , required    : this._required ? true : undefined
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
     * @returns {NrTextField}
     */
    static parseValue (objValue) {

        if ( !objValue ) {
            throw new TypeError(`${this.nrName}.parseValue(): objValue was not defined`);
        }

        if ( objValue instanceof NrTextField ) {
            return objValue;
        }

        const {
            type
            , id
            , name
            , label
            , placeholder
            , icon
            , value
            , readOnly
            , required
        } = objValue;

        if ( type !== NrObjectType.TEXT_FIELD ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        return new NrTextField({
            id               : !_.isNil(id)           ? id                      : undefined
            , name           : !_.isNil(name)         ? name                    : undefined
            , label          : !_.isNil(label)        ? label                   : undefined
            , placeholder    : !_.isNil(placeholder)  ? placeholder             : undefined
            , icon           : !_.isNil(icon)         ? NrIcon.parseValue(icon) : undefined
            , value          : !_.isNil(value)        ? value                   : undefined
            , readOnly       : !_.isNil(readOnly)     ? !!readOnly              : undefined
            , required       : !_.isNil(required)     ? !!required              : undefined
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrTextField;
