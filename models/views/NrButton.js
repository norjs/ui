import _ from 'lodash';
import NrView from "./NrView";
import NrObjectType from "../NrObjectType";
import NrIcon from "../NrIcon";
import NrModelUtils from "../../utils/NrModelUtils";
import LogUtils from "@norjs/utils/Log";

/**
 *
 * @enum {string}
 * @readonly
 */
export const NrButtonStyle = {

    ACCEPT   : 'accept',
    SUBMIT   : 'submit',
    CANCEL   : 'cancel',
    DEFAULT  : 'default',

    /**
     * Small button style intended for single icon buttons, eg. no minimum width.
     */
    ICON     : 'icon'

};

/**
 *
 * @implements {NrModel}
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
     * @returns {typeof NrButtonStyle}
     */
    static get Style () {
        return NrButtonStyle;
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
     * @param [id] {string}
     * @param [name] {string}
     * @param [style] {NrButtonStyle|string}
     * @param [label] {string}
     * @param [icon] {NrIcon}
     * @param [click] {NrModel} The click action
     * @param [enabled] {boolean}
     */
    constructor ({
        id = undefined
        , name = undefined
        , style = undefined
        , label = undefined
        , icon = undefined
        , click = undefined
        , enabled = true
    } = {}) {

        if ( name !== undefined && !_.isString(name) ) {
            throw new TypeError(`new ${NrButton.nrName}(): name invalid: "${LogUtils.getAsString(name)}"`);
        }

        if ( id !== undefined && !_.isString(id) ) {
            throw new TypeError(`new ${NrButton.nrName}(): id invalid: "${LogUtils.getAsString(id)}"`);
        }

        if ( style !== undefined && !_.isString(style) ) {
            throw new TypeError(`new ${NrButton.nrName}(): style invalid: "${LogUtils.getAsString(style)}"`);
        }

        if ( label !== undefined && !_.isString(label) ) {
            throw new TypeError(`new ${NrButton.nrName}(): label invalid: "${LogUtils.getAsString(label)}"`);
        }

        if ( icon !== undefined && !(icon instanceof NrIcon) ) {
            throw new TypeError(`new ${NrButton.nrName}(): icon invalid: "${LogUtils.getAsString(icon)}"`);
        }

        if ( click !== undefined && !NrModelUtils.isModel(click) ) {
            throw new TypeError(`new ${NrButton.nrName}(): click invalid: "${LogUtils.getAsString(click)}"`);
        }

        if ( !_.isBoolean(enabled) ) {
            throw new TypeError(`new ${NrButton.nrName}(): enabled invalid: "${LogUtils.getAsString(enabled)}"`);
        }

        super();

        /**
         *
         * @member {string|undefined}
         * @protected
         */
        this._id = id;

        /**
         *
         * @member {string|undefined}
         * @protected
         */
        this._style = style;

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
         * @member {NrModel|undefined}
         * @protected
         */
        this._click = click;

        /**
         *
         * @member {boolean}
         * @protected
         */
        this._enabled = enabled;

    }

    /**
     *
     * @returns {string}
     */
    get type () {
        return NrObjectType.BUTTON;
    }

    /**
     * This is the button style.
     *
     * @returns {string}
     */
    get style () {
        return this._style;
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
    get label () {
        return this._label;
    }

    /**
     *
     * @returns {boolean}
     */
    get enabled () {
        return this._enabled;
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
    get click () {
        return this._click;
    }

    /**
     *
     * @returns {Object}
     */
    valueOf () {
        return {
            type: this.type
            , id: this._id
            , name: this._name
            , label: this._label
            , style: this._style
            , icon: !_.isNil(this._icon) ? this._icon.valueOf() : null
            , click: !_.isNil(this._click) ? this._click.valueOf() : null
            , enabled: this._enabled
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
            , id
            , name
            , label
            , icon
            , click
            , enabled
            , style
        } = value;

        if ( type !== NrObjectType.BUTTON ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        return new NrButton({
              id         : !_.isNil(id)          ? id                             : undefined
            , name       : !_.isNil(name)        ? name                           : undefined
            , style      : !_.isNil(style)       ? style                          : undefined
            , label      : !_.isNil(label)       ? label                          : undefined
            , icon       : !_.isNil(icon)        ? NrIcon.parseValue(icon)        : undefined
            , click      : !_.isNil(click)       ? NrModelUtils.parseValue(click) : undefined
            , enabled    : !_.isNil(enabled)     ? enabled                        : undefined
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrButton;
