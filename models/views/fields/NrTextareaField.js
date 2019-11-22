import _ from 'lodash';
import NrField from "./NrField";
import NrObjectType from "../../NrObjectType";
import NrIcon from "../../NrIcon";

/**
 *
 * @implements {NrModel}
 */
export class NrTextareaField extends NrField {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.TEXTAREA_FIELD;
    }

    /**
     *
     * @returns {typeof NrTextareaField}
     */
    get Class () {
        return NrTextareaField;
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
     * @param [placeholder] {string}
     * @param [icon] {NrIcon}
     * @param [value] {string}
     * @param [readOnly] {boolean}
     */
    constructor ({
        name = undefined
        , label = undefined
        , placeholder = undefined
        , value = undefined
        , icon = undefined
        , readOnly = undefined
    } = {}) {

        if ( name !== undefined && !_.isString(name) ) {
            throw new TypeError(`new ${NrTextareaField.nrName}(): name invalid: "${name}"`);
        }

        if ( label !== undefined && !_.isString(label) ) {
            throw new TypeError(`new ${NrTextareaField.nrName}(): label invalid: "${label}"`);
        }

        if ( placeholder !== undefined && !_.isString(placeholder) ) {
            throw new TypeError(`new ${NrTextareaField.nrName}(): placeholder invalid: "${placeholder}"`);
        }

        if ( icon !== undefined && !(icon instanceof NrIcon) ) {
            throw new TypeError(`new ${NrTextareaField.nrName}(): icon invalid: "${icon}"`);
        }

        if ( value !== undefined && !_.isString(value) ) {
            throw new TypeError(`new ${NrTextareaField.nrName}(): value invalid: "${value}"`);
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

    }

    /**
     *
     * @returns {string}
     */
    get type () {
        return NrObjectType.TEXTAREA_FIELD;
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
              type        : this.type
            , label       : this._label
            , placeholder : this._placeholder
            , name        : this._name
            , icon        : !_.isNil(this._icon) ? this._icon.valueOf() : null
            , value       : !_.isNil(this._value) ? this._value : undefined
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
     * @returns {NrTextareaField}
     */
    static parseValue (objValue) {

        if ( !objValue ) {
            throw new TypeError(`${this.nrName}.parseValue(): objValue was not defined`);
        }

        if ( objValue instanceof NrTextareaField ) {
            return objValue;
        }

        const {
            type
            , name
            , label
            , placeholder
            , icon
            , value
            , readOnly
        } = objValue;

        if ( type !== NrObjectType.TEXTAREA_FIELD ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        return new NrTextareaField({
              name         : !_.isNil(name)        ? name                    : undefined
            , label        : !_.isNil(label)       ? label                   : undefined
            , placeholder  : !_.isNil(placeholder) ? placeholder             : undefined
            , icon         : !_.isNil(icon)        ? NrIcon.parseValue(icon) : undefined
            , value       : !_.isNil(value)       ? value                   : undefined
            , readOnly    : !_.isNil(readOnly)    ? !!readOnly              : undefined
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrTextareaField;
