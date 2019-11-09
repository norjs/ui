import _ from "lodash";
import NrObjectType from "./NrObjectType";
import "./NrModel";
import NrEvent from "./NrEvent.js";
import LogUtils from "@norjs/utils/src/LogUtils";

/**
 * This is a data model for an NorJS Event container.
 *
 * @implements {NrModel}
 */
export class NrEventList {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.EVENT_LIST;
    }

    /**
     *
     * @returns {typeof NrEventList}
     */
    get Class () {
        return NrEventList;
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
     * @param [name] {string} If defined, every event in the content must be same name.
     * @param [content] {Array.<NrEvent>}
     */
    constructor ({
        name = undefined,
        content = undefined
    } = {}) {

        if ( name !== undefined && !_.isString(name) ) {
            throw new TypeError(`new ${NrEventList.nrName}(): name invalid: "${LogUtils.getAsString(name)}"`);
        }

        if ( ! ( content && _.isArray(content) && _.every(content, e => e instanceof NrEvent) ) ) {
            throw new TypeError(`new ${NrEventList.nrName}(): content not NrEvent[]: "${LogUtils.getAsString(content)}"`);
        }

        // FIXME: If name defined, check that every event has same name

        /**
         *
         * @member {string|undefined}
         * @protected
         */
        this._name = name;

        /**
         *
         * @member {ReadonlyArray.<NrEvent>}
         * @private
         */
        this._content = Object.freeze(_.concat([], content));

    }

    /**
     *
     * @returns {string}
     */
    get type () {
        return `${NrObjectType.EVENT}`;
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
     * @returns {ReadonlyArray<NrEvent>}
     */
    get content () {
        return this._content;
    }

    /**
     *
     * @returns {Object}
     */
    valueOf () {
        return {
            type    : this.type,
            name    : this._name !== undefined ? this._name : null,
            content : _.map(this._content, e => e.valueOf())
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
     * @returns {NrEventList}
     */
    static parseValue (modelValue) {

        if ( !modelValue ) {
            throw new TypeError(`${this.nrName}.parseValue(): modelValue was not defined`);
        }

        if ( modelValue instanceof NrEventList ) {
            return modelValue;
        }

        const {
            type
            , name
            , content
        } = modelValue;

        if ( !_.startsWith(type, `${NrObjectType.EVENT}:`) ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${LogUtils.getAsString(type)}"`);
        }

        if ( !_.isArray(content) ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's content is not an array: "${LogUtils.getAsString(content)}"`);
        }

        return new NrEventList({
            name    : !_.isNil(name) ? name : undefined,
            content : _.map(content, event => NrEvent.parseValue(event))
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrEventList;
