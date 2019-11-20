import _ from 'lodash';
import NrView from "../NrView";
import NrObjectType from "../../NrObjectType";
import NrIcon from "../../NrIcon";

/**
 *
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
     * @param [icon] {NrIcon}
     */
    constructor ({
        name = undefined
        , label = undefined
        , placeholder = undefined
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
            , placeholder: this._placeholder
            , name: this._name
            , icon: !_.isNil(this._icon) ? this._icon.valueOf() : null
        };
    }

    /**
     *
     * @param value {*}
     * @returns {NrDateField}
     */
    static parseValue (value) {

        if ( !value ) {
            throw new TypeError(`${this.nrName}.parseValue(): value was not defined`);
        }

        if ( value instanceof NrDateField ) {
            return value;
        }

        const {
            type
            , name
            , label
            , placeholder
            , icon
        } = value;

        if ( type !== NrObjectType.DATE_FIELD ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        return new NrDateField({
              name        : !_.isNil(name)        ? name                    : undefined
            , label       : !_.isNil(label)       ? label                   : undefined
            , placeholder : !_.isNil(placeholder) ? placeholder             : undefined
            , icon        : !_.isNil(icon)        ? NrIcon.parseValue(icon) : undefined
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrDateField;
