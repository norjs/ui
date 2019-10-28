import NrObjectType from "../NrObjectType";
import NrView from "./NrView";
import NrRequest from "../NrRequest";

/**
 *
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
     * @param label {string}
     * @param action {NrRequest}
     */
    constructor ({
        label = undefined,
        action = undefined
    } = {}) {

        if ( label !== undefined && !_.isString(label) ) {
            throw new TypeError(`new ${NrConfirmDialog.nrName}(): label invalid: "${label}"`);
        }

        if ( action !== undefined && !(action instanceof NrRequest) ) {
            throw new TypeError(`new ${NrConfirmDialog.nrName}(): action invalid: "${action}"`);
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
         * @member {NrRequest|undefined}
         * @protected
         */
        this._action = action;

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
     * @returns {NrRequest}
     */
    get action () {
        return this._action;
    }

    /**
     *
     * @returns {Object}
     */
    valueOf () {
        return {
            type: this.type,
            label: this._label,
            action: this._action ? this._action : null
        };
    }

    /**
     *
     * @param value {*}
     * @returns {NrConfirmDialog}
     */
    static parseValue (value) {

        // TODO: Implement type checks

        return new NrConfirmDialog({
            label: value.label,
            action: NrRequest.parseValue(value.action)
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrConfirmDialog;
