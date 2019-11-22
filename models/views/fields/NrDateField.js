import _ from 'lodash';
import NrView from "../NrView";
import NrObjectType from "../../NrObjectType";
import NrIcon from "../../NrIcon";

/**
 *
 * @implements {NrModel}
 */
export class NrDateField extends NrView {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.DATE_FIELD;
    }

    /**
     *
     * @returns {typeof NrDateField}
     */
    get Class () {
        return NrDateField;
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
     * @param [value] {string}
     * @param [readOnly] {boolean}
     * @param [icon] {NrIcon}
     */
    constructor ({
        name = undefined
        , label = undefined
        , placeholder = undefined
        , value = undefined
        , readOnly = undefined
        , icon = undefined
    } = {}) {

        if ( name !== undefined && !_.isString(name) ) {
            throw new TypeError(`new ${NrDateField.nrName}(): name invalid: "${name}"`);
        }

        if ( label !== undefined && !_.isString(label) ) {
            throw new TypeError(`new ${NrDateField.nrName}(): label invalid: "${label}"`);
        }

        if ( placeholder !== undefined && !_.isString(placeholder) ) {
            throw new TypeError(`new ${NrDateField.nrName}(): placeholder invalid: "${placeholder}"`);
        }

        if ( value !== undefined && !_.isString(value) ) {
            throw new TypeError(`new ${NrDateField.nrName}(): value invalid: "${value}"`);
        }

        if ( readOnly !== undefined && !_.isBoolean(readOnly) ) {
            throw new TypeError(`new ${NrDateField.nrName}(): readOnly invalid: "${readOnly}"`);
        }

        if ( icon !== undefined && !(icon instanceof NrIcon) ) {
            throw new TypeError(`new ${NrDateField.nrName}(): icon invalid: "${icon}"`);
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
        return NrObjectType.DATE_FIELD;
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
              type        : this.type
            , label       : this._label
            , placeholder : this._placeholder
            , value       : !_.isNil(this._value) ? this._value : undefined
            , readOnly    : this._readOnly ? true : undefined
            , name        : this._name
            , icon        : !_.isNil(this._icon) ? this._icon.valueOf() : null
        };
    }

    /**
     *
     * @param objValue {*}
     * @returns {NrDateField}
     */
    static parseValue (objValue) {

        if ( !objValue ) {
            throw new TypeError(`${this.nrName}.parseValue(): objValue was not defined`);
        }

        if ( objValue instanceof NrDateField ) {
            return objValue;
        }

        const {
            type
            , name
            , label
            , placeholder
            , value
            , readOnly
            , icon
        } = objValue;

        if ( type !== NrObjectType.DATE_FIELD ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        return new NrDateField({
              name        : !_.isNil(name)        ? name                    : undefined
            , label       : !_.isNil(label)       ? label                   : undefined
            , placeholder : !_.isNil(placeholder) ? placeholder             : undefined
            , value       : !_.isNil(value)       ? value                   : undefined
            , readOnly    : !_.isNil(readOnly)    ? !!readOnly              : undefined
            , icon        : !_.isNil(icon)        ? NrIcon.parseValue(icon) : undefined
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrDateField;
