import _ from "lodash";
import NrMessage from "./NrMessage";
import NrObjectType from "../NrObjectType";
import NrIcon from "../NrIcon";

/**
 *
 * @implements {NrModel}
 */
export class NrErrorMessage extends NrMessage {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.ERROR_MESSAGE;
    }

    /**
     *
     * @returns {typeof NrErrorMessage}
     */
    get Class () {
        return NrErrorMessage;
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
     * @param [icon] {NrIcon}
     * @param [content] {string}
     */
    constructor ({
        label = undefined
        , icon = undefined
        , content = undefined
    } = {}) {

        if ( label !== undefined && !_.isString(label) ) {
            throw new TypeError(`new ${NrErrorMessage.nrName}(): label invalid: "${label}"`);
        }

        if ( icon !== undefined && !(icon instanceof NrIcon) ) {
            throw new TypeError(`new ${NrErrorMessage.nrName}(): icon invalid: "${icon}"`);
        }

        if ( content !== undefined && !_.isString(content) ) {
            throw new TypeError(`new ${NrErrorMessage.nrName}(): content invalid: "${content}"`);
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

        /**
         *
         * @member {string|undefined}
         * @protected
         */
        this._content = content;

    }

    /**
     *
     * @returns {string}
     */
    get type () {
        return NrObjectType.ERROR_MESSAGE;
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
    get content () {
        return this._content;
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
            , icon: this._icon ? this._icon.valueOf() : null
        };
    }

    /**
     *
     * @param value {*}
     * @returns {NrErrorMessage}
     */
    static parseValue (value) {

        if ( !value ) {
            throw new TypeError(`${this.nrName}.parseValue(): value was not defined`);
        }

        if ( value instanceof NrErrorMessage) {
            return value;
        }

        const {
            type,
            label,
            content,
            icon
        } = value;

        if ( type !== NrObjectType.ERROR_MESSAGE ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        return new NrErrorMessage({
            label     : !_.isNil(label)   ? label                   : undefined
            , content : !_.isNil(content) ? content                 : undefined
            , icon    : !_.isNil(icon)    ? NrIcon.parseValue(icon) : undefined
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrErrorMessage;
