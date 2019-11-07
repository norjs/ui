import _ from 'lodash';
import NrModelUtils from "../../utils/NrModelUtils";
import NrObjectType from "../NrObjectType";
import NrView from "./NrView";
import NrIcon from "../NrIcon";

/**
 *
 * @implements {NrModel}
 */
export class NrConfirmDialog extends NrView {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.CONFIRM_DIALOG;
    }

    /**
     *
     * @returns {typeof NrConfirmDialog}
     */
    get Class () {
        return NrConfirmDialog;
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
     * @param [accept] {NrModel}
     * @param [cancel] {NrModel}
     */
    constructor ({
        label = undefined
        , icon = undefined
        , accept = undefined
        , cancel = undefined
    } = {}) {

        if ( label !== undefined && !_.isString(label) ) {
            throw new TypeError(`new ${NrConfirmDialog.nrName}(): label invalid: "${label}"`);
        }

        if ( icon !== undefined && !(icon instanceof NrIcon) ) {
            throw new TypeError(`new ${NrConfirmDialog.nrName}(): icon invalid: "${icon}"`);
        }

        if ( accept !== undefined && !NrModelUtils.isModel(accept) ) {
            throw new TypeError(`new ${NrConfirmDialog.nrName}(): accept invalid: "${accept}"`);
        }

        if ( cancel !== undefined && !NrModelUtils.isModel(cancel) ) {
            throw new TypeError(`new ${NrConfirmDialog.nrName}(): cancel invalid: "${cancel}"`);
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
         * @member {NrModel|undefined}
         * @protected
         */
        this._accept = accept;

        /**
         *
         * @member {NrModel|undefined}
         * @protected
         */
        this._cancel = cancel;

    }

    /**
     *
     * @returns {string}
     */
    get type () {
        return NrObjectType.CONFIRM_DIALOG;
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
     * @returns {NrModel}
     */
    get accept () {
        return this._accept;
    }

    /**
     *
     * @returns {NrModel}
     */
    get cancel () {
        return this._cancel;
    }

    /**
     *
     * @returns {Object}
     */
    valueOf () {
        return {
            type: this.type
            , label: this._label
            , icon: !_.isNil(this._icon) ? this._icon.valueOf() : null
            , accept: this._accept ? this._accept : null
            , cancel: this._cancel ? this._cancel : null
        };
    }

    /**
     *
     * @param value {*}
     * @returns {NrConfirmDialog}
     */
    static parseValue (value) {

        if ( !value ) {
            throw new TypeError(`${this.nrName}.parseValue(): value was not defined`);
        }

        if ( value instanceof NrConfirmDialog) {
            return value;
        }

        const {
            type
            , label
            , icon
            , accept
            , cancel
        } = value;

        if ( type !== NrObjectType.CONFIRM_DIALOG ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        return new NrConfirmDialog({
            label    : !_.isNil(label)  ? label                           : undefined
            , icon   : !_.isNil(icon)   ? NrIcon.parseValue(icon)         : undefined
            , accept : !_.isNil(accept) ? NrModelUtils.parseValue(accept) : undefined
            , cancel : !_.isNil(cancel) ? NrModelUtils.parseValue(cancel) : undefined
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrConfirmDialog;
