import _ from "lodash";
import NrObjectType from "./NrObjectType";
import "./NrModel";
import NrIcon from "./NrIcon";
import NrImage from "./NrImage";
import NrModelUtils from "../utils/NrModelUtils";

/**
 * This is a data model for header UI element.
 *
 * @implements {NrModel}
 */
export class NrHeader {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.HEADER;
    }

    /**
     *
     * @returns {typeof NrHeader}
     */
    get Class () {
        return NrHeader;
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
     * @param [id] {string|undefined}
     * @param [className] {string|Array.<string>|undefined}
     * @param [logo] {NrImage|NrIcon|undefined}
     * @param [title] {string|undefined}
     */
    constructor (
        {
            id = undefined,
            className = undefined,
            logo = undefined,
            title = undefined
        } = {}
    ) {

        if ( id !== undefined && !_.isString(id) ) {
            throw new TypeError(`new ${NrHeader.nrName}(): id invalid: "${id}"`);
        }

        // FIXME: Check if array contains only strings
        if ( className !== undefined && !( _.isString(className) || _.isArray(className) ) ) {
            throw new TypeError(`new ${NrHeader.nrName}(): className invalid: "${className}"`);
        }

        if ( logo !== undefined && !( logo instanceof NrImage || logo instanceof NrIcon ) ) {
            throw new TypeError(`new ${NrHeader.nrName}(): logo invalid: "${logo}"`);
        }

        if ( title !== undefined && !_.isString(title) ) {
            throw new TypeError(`new ${NrHeader.nrName}(): title invalid: "${title}"`);
        }

        /**
         *
         * @member {string|undefined}
         * @protected
         */
        this._id = id;

        /**
         *
         * @member {string|Array.<string>|undefined}
         * @protected
         */
        this._className = className;

        /**
         *
         * @member {NrIcon|NrImage|undefined}
         * @protected
         */
        this._logo = logo;

        /**
         *
         * @member {string|undefined}
         * @protected
         */
        this._title = title;

    }

    /**
     *
     * @returns {string}
     */
    get type () {
        return NrObjectType.HEADER;
    }

    /**
     *
     * @returns {string}
     */
    get id () {
        return this._id;
    }

    /**
     *
     * @returns {string|Array.<string>|undefined}
     */
    get className () {
        return this._className;
    }

    /**
     *
     * @returns {NrIcon|NrImage|undefined}
     */
    get logo () {
        return this._logo;
    }

    /**
     *
     * @returns {string}
     */
    get title () {
        return this._title;
    }

    /**
     *
     * @returns {Object}
     */
    valueOf () {
        return {
            type: this.type
            , id: this._id
            , className: this._className
            , logo: this._logo ? this._logo.valueOf() : undefined
            , title: this._title
        };
    }

    /**
     *
     * @returns {Object}
     */
    toJSON () {
        return this.valueOf();
    }

    /**
     *
     * @param modelValue {*}
     * @returns {NrHeader}
     */
    static parseValue (modelValue) {

        if ( !modelValue ) {
            throw new TypeError(`${this.nrName}.parseValue(): modelValue was not defined`);
        }

        if ( modelValue instanceof NrHeader ) {
            return modelValue;
        }

        const { type, id, className, logo, title } = modelValue;

        if ( type !== NrObjectType.HEADER ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        return new NrHeader({
            id: !_.isNil(id) ? id : undefined
            , className: !_.isNil(className) ? className : undefined
            , logo: !_.isNil(logo) ? NrModelUtils.parseValue(logo) : undefined
            , title: !_.isNil(title) ? title : undefined
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrHeader;
