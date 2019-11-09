import _ from 'lodash';
import NrView from "../NrView";
import NrObjectType from "../../NrObjectType";
import NrIcon from "../../NrIcon";
import NrModelUtils from "../../../utils/NrModelUtils";

/**
 *
 */
export class NrOption extends NrView {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.OPTION;
    }

    /**
     *
     * @returns {typeof NrOption}
     */
    get Class () {
        return NrOption;
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
     * @param [label] {string}
     * @param [value] {*}
     * @param [icon] {NrIcon}
     */
    constructor ({
        label = undefined
        , value = undefined
        , icon = undefined
    } = {}) {

        if ( label !== undefined && !_.isString(label) ) {
            throw new TypeError(`new ${NrOption.nrName}(): label invalid: "${label}"`);
        }

        if ( icon !== undefined && !(icon instanceof NrIcon) ) {
            throw new TypeError(`new ${NrOption.nrName}(): icon invalid: "${icon}"`);
        }

        super();

        /**
         *
         * @member {string|undefined}
         * @protected
         */
        this._label = label;

        /**
         *
         * @member {*}
         * @protected
         */
        this._value = value;

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
        return NrObjectType.OPTION;
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
     * @returns {*}
     */
    get value () {
        return this._value;
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
     * @returns {Object}
     */
    valueOf () {
        return {
            type: this.type
            , label: this._label
            , value: NrModelUtils.isModel(this._value) ? this._value.valueOf() : this._value
            , icon: !_.isNil(this._icon) ? this._icon.valueOf() : null
        };
    }

    /**
     *
     * @param modelValue {*}
     * @returns {NrOption}
     */
    static parseValue (modelValue) {

        if ( !modelValue ) {
            throw new TypeError(`${this.nrName}.parseValue(): modelValue was not defined`);
        }

        if ( modelValue instanceof NrOption ) {
            return modelValue;
        }

        const {
            type
            , label
            , value
            , icon
        } = modelValue;

        if ( type !== NrObjectType.OPTION ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        return new NrOption({
              label : !_.isNil(label) ? label                   : undefined
            , value : !_.isNil(value) ? (NrModelUtils.isModelValue(value) ? NrModelUtils.parseValue(value) : value) : undefined
            , icon  : !_.isNil(icon)  ? NrIcon.parseValue(icon) : undefined
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrOption;
