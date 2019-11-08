import _ from 'lodash';
import NrView from "../NrView";
import NrObjectType from "../../NrObjectType";
import NrIcon from "../../NrIcon";

/**
 *
 */
export class NrSelectField extends NrView {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.SELECT_FIELD;
    }

    /**
     *
     * @returns {typeof NrPasswordField}
     */
    get Class () {
        return NrSelectField;
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
                     , options = undefined
                 } = {}) {

        if ( name !== undefined && !_.isString(name) ) {
            throw new TypeError(`new ${NrSelectField.nrName}(): name invalid: "${name}"`);
        }

        if ( label !== undefined && !_.isString(label) ) {
            throw new TypeError(`new ${NrSelectField.nrName}(): label invalid: "${label}"`);
        }

        if ( icon !== undefined && !(icon instanceof NrIcon) ) {
            throw new TypeError(`new ${NrSelectField.nrName}(): icon invalid: "${icon}"`);
        }

        if ( options !== undefined && !(typeof options == "object") ) {
            throw new TypeError(`new ${NrSelectField.nrName}(): options invalid: "${options}"`);
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
         * @member {NrIcon|undefined}
         * @protected
         */
        this._options = options;

    }

    /**
     *
     * @returns {string}
     */
    get type () {
        return NrObjectType.SELECT_FIELD;
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
     * @returns {string}
     */
    get options () {
        return this._options;
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
            , list: this._list
        };
    }

    /**
     *
     * @param value {*}
     * @returns {NrSelectField}
     */
    static parseValue (value) {

        if ( !value ) {
            throw new TypeError(`${this.nrName}.parseValue(): value was not defined`);
        }

        if ( value instanceof NrSelectField ) {
            return value;
        }

        const {
            type
            , name
            , label
            , icon
            , list
        } = value;

        if ( type !== NrObjectType.SELECT_FIELD ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        return new NrSelectField({
            name  : !_.isNil(name)  ? name                    : undefined
            , label : !_.isNil(label) ? label                   : undefined
            , icon  : !_.isNil(icon)  ? NrIcon.parseValue(icon) : undefined
            , list  : !_.isNil(list)  ? list                    : undefined
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrSelectField;
