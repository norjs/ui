import _ from "lodash";
import NrView from "./NrView";
import NrObjectType from "../NrObjectType";
import NrIcon from "../NrIcon";

/**
 *
 */
export class NrInfoMessage extends NrView {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.INFO_MESSAGE;
    }

    /**
     *
     * @returns {typeof NrInfoMessage}
     */
    get Class () {
        return NrInfoMessage;
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
     * @param label {string}
     * @param icon {NrIcon}
     */
    constructor ({
        label = undefined
        , icon = undefined
    } = {}) {

        if ( label !== undefined && !_.isString(label) ) {
            throw new TypeError(`new ${NrInfoMessage.nrName}(): label invalid: "${label}"`);
        }

        if ( icon !== undefined && !(icon instanceof NrIcon) ) {
            throw new TypeError(`new ${NrInfoMessage.nrName}(): icon invalid: "${icon}"`);
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
         * @member {NrIcon|undefined}
         * @protected
         */
        this._icon = icon ? Object.freeze(icon) : undefined;

    }

    /**
     *
     * @returns {string}
     */
    get type () {
        return NrObjectType.INFO_MESSAGE;
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
     * @returns {Object}
     */
    valueOf () {
        return {
            type: this.type
            , label: this._label
            , icon: this._icon.valueOf()
        };
    }

    /**
     *
     * @param value {*}
     * @returns {NrInfoMessage}
     */
    static parseValue (value) {

        if ( !value ) {
            throw new TypeError(`${this.nrName}.parseValue(): value was not defined`);
        }

        if ( value instanceof NrInfoMessage) {
            return value;
        }

        const { type, label, icon } = value;

        if ( type !== NrObjectType.INFO_MESSAGE ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        return new NrInfoMessage({
            label: !_.isNil(label) ? label : undefined
            , icon: !_.isNil(icon) ? NrIcon.parseValue(icon) : undefined
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrInfoMessage;
