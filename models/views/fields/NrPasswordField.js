import _ from 'lodash';
import NrView from "../NrView";
import NrObjectType from "../../NrObjectType";
import NrIcon from "../../NrIcon";

/**
 *
 * @implements {NrModel}
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
            throw new TypeError(`new ${NrPasswordField.nrName}(): name invalid: "${name}"`);
        }

        if ( label !== undefined && !_.isString(label) ) {
            throw new TypeError(`new ${NrPasswordField.nrName}(): label invalid: "${label}"`);
        }

        if ( placeholder !== undefined && !_.isString(placeholder) ) {
            throw new TypeError(`new ${NrPasswordField.nrName}(): placeholder invalid: "${placeholder}"`);
        }

        if ( icon !== undefined && !(icon instanceof NrIcon) ) {
            throw new TypeError(`new ${NrPasswordField.nrName}(): icon invalid: "${icon}"`);
        }

        if ( value !== undefined && !_.isString(value) ) {
            throw new TypeError(`new ${NrPasswordField.nrName}(): value invalid: "${value}"`);
        }

        if ( readOnly !== undefined && !_.isBoolean(readOnly) ) {
            throw new TypeError(`new ${NrPasswordField.nrName}(): readOnly invalid: "${readOnly}"`);
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
            type: this.type
            , label: this._label
            , placeholder: this._placeholder
            , name: this._name
            , icon: !_.isNil(this._icon) ? this._icon.valueOf() : null
            , value       : !_.isNil(this._value) ? this._value : undefined
            , readOnly    : this._readOnly ? true : undefined
        };
    }

    /**
     *
     * @param value {*}
     * @returns {NrPasswordField}
     */
    static parseValue (objValue) {

        if ( !objValue ) {
            throw new TypeError(`${this.nrName}.parseValue(): objValue was not defined`);
        }

        if ( objValue instanceof NrPasswordField ) {
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

        if ( type !== NrObjectType.PASSWORD_FIELD ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        return new NrPasswordField({
              name        : !_.isNil(name)        ? name                    : undefined
            , label       : !_.isNil(label)       ? label                   : undefined
            , placeholder : !_.isNil(placeholder) ? placeholder                   : undefined
            , icon        : !_.isNil(icon)        ? NrIcon.parseValue(icon) : undefined
            , value       : !_.isNil(value)       ? value                   : undefined
            , readOnly    : !_.isNil(readOnly)    ? !!readOnly              : undefined
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrPasswordField;
