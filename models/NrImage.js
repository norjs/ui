import _ from "lodash";
import NrObjectType from "./NrObjectType";
import "./NrModel";

/**
 * This is a data model for image.
 *
 * @implements {NrModel}
 */
export class NrImage {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.IMAGE;
    }

    /**
     *
     * @returns {typeof NrImage}
     */
    get Class () {
        return NrImage;
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
     * @param [src] {string}
     * @param [id] {string}
     * @param [className] {string|Array.<string>|undefined}
     * @param [alt] {string|undefined}
     */
    constructor (
        {
            src,
            id = undefined,
            className = undefined,
            alt = undefined
        } = {}
    ) {

        if ( !_.isString(src) ) {
            throw new TypeError(`new ${NrImage.nrName}(): src invalid: "${src}"`);
        }

        if ( alt !== undefined && !_.isString(alt) ) {
            throw new TypeError(`new ${NrImage.nrName}(): alt invalid: "${alt}"`);
        }

        if ( id !== undefined && !_.isString(id) ) {
            throw new TypeError(`new ${NrImage.nrName}(): id invalid: "${id}"`);
        }

        // FIXME: Check if array contains only strings
        if ( className !== undefined && !( _.isString(className) || _.isArray(className) ) ) {
            throw new TypeError(`new ${NrHeader.nrName}(): className invalid: "${className}"`);
        }

        /**
         *
         * @member {string}
         * @protected
         */
        this._src = src;

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
        this._alt = alt;

        /**
         *
         * @member {string|Array.<string>|undefined}
         * @protected
         */
        this._className = className;

    }

    /**
     *
     * @returns {string}
     */
    get type () {
        return NrObjectType.IMAGE;
    }

    /**
     *
     * @returns {string}
     */
    get src () {
        return this._src;
    }

    /**
     *
     * @returns {string|undefined}
     */
    get id () {
        return this._id;
    }

    /**
     *
     * @returns {string|undefined}
     */
    get alt () {
        return this._alt;
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
     * @returns {Object}
     */
    valueOf () {
        return {
            type: this.type
            , src: this._src
            , alt: this._alt
            , className: this._className
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
     * @returns {NrImage}
     */
    static parseValue (modelValue) {

        if ( !modelValue ) {
            throw new TypeError(`${this.nrName}.parseValue(): modelValue was not defined`);
        }

        if ( modelValue instanceof NrImage ) {
            return modelValue;
        }

        const { type, src, alt, className } = modelValue;

        if ( type !== NrObjectType.IMAGE ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        return new NrImage({
            src: src
            , alt: !_.isNil(alt) ? alt : undefined
            , className: !_.isNil(className) ? className : undefined
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrImage;
