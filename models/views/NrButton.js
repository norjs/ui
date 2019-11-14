import _ from 'lodash';
import NrView from "./NrView";
import NrObjectType from "../NrObjectType";
import NrIcon from "../NrIcon";

/**
 *
 */
export class NrButton extends NrView {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.BUTTON;
    }

    /**
     *
     * @returns {typeof NrPasswordField}
     */
    get Class () {
        return NrButton;
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
                     label = undefined
                     , icon = undefined
                 } = {}) {

        if ( label !== undefined && !_.isString(label) ) {
            throw new TypeError(`new ${NrButton.nrName}(): label invalid: "${label}"`);
        }

        if ( icon !== undefined && !(icon instanceof NrIcon) ) {
            throw new TypeError(`new ${NrButton.nrName}(): icon invalid: "${icon}"`);
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
        this._icon = icon;

    }

    /**
     *
     * @returns {string}
     */
    get type () {
        return NrObjectType.BUTTON;
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
            , icon: !_.isNil(this._icon) ? this._icon.valueOf() : null
        };
    }

    /**
     *
     * @param value {*}
     * @returns {NrButton}
     */
    static parseValue (value) {

        if ( !value ) {
            throw new TypeError(`${this.nrName}.parseValue(): value was not defined`);
        }

        if ( value instanceof NrButton ) {
            return value;
        }

        const {
            type
            , label
            , icon
        } = value;

        if ( type !== NrObjectType.BUTTON ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        return new NrButton({
            label : !_.isNil(label) ? label                     : undefined
            , icon  : !_.isNil(icon)  ? NrIcon.parseValue(icon) : undefined
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrButton;
