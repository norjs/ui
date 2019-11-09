import _ from 'lodash';
import NrObjectType from "../NrObjectType";
import NrView from "./NrView";
import NrModelUtils from "../../utils/NrModelUtils";

/**
 * Can be used to join multiple view components in one element
 *
 * @implements {NrModel}
 */
export class NrDiv extends NrView {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.DIV;
    }

    /**
     *
     * @returns {typeof NrDiv}
     */
    get Class () {
        return NrDiv;
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
     * @param [id] {string}  The id of the div
     * @param [content] {Array.<NrView>} Form fields
     */
    constructor ({
        id = undefined
        , content = []
    } = {}) {

        if ( id !== undefined && !_.isString(id) ) {
            throw new TypeError(`new ${NrDiv.nrName}(): id invalid: "${id}"`);
        }

        // FIXME: This should check also NrView interface
        if ( content !== undefined && !_.isArray(content) ) {
            throw new TypeError(`new ${NrDiv.nrName}(): content invalid: "${content}"`);
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
         * @member {ReadonlyArray.<NrView>}
         * @protected
         */
        this._content = Object.freeze(_.concat([], content));

    }

    /**
     *
     * @returns {string}
     */
    get type () {
        return NrObjectType.DIV;
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
     * @returns {ReadonlyArray.<NrView>}
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
            type: this.type
            , id: this._id
            , content: _.map(this._content, item => item.valueOf())
        };
    }

    /**
     *
     * @param value {*}
     * @returns {NrDiv}
     */
    static parseValue (value) {

        if ( !value ) {
            throw new TypeError(`${this.nrName}.parseValue(): value was not defined`);
        }

        if ( value instanceof NrDiv) {
            return value;
        }

        const {
            type
            , id
            , content
        } = value;

        if ( type !== NrObjectType.DIV ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        // FIXME: This should check value.content items NrView interface
        if ( !_.isNil(content) && !_.isArray(content) ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's content is not correct: "${content}"`);
        }

        return new NrDiv({
              id        : !_.isNil(id)       ? id                                                    : undefined
            , content   : !_.isNil(content)  ? _.map(content, item => NrModelUtils.parseValue(item)) : undefined
        });

    }

}

export default NrDiv;
