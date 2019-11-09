import _ from 'lodash';
import NrObjectType from "../NrObjectType";
import NrView from "./NrView";
import NrModelUtils from "../../utils/NrModelUtils";

/**
 * The nr-nav style
 *
 * @enum {string}
 * @readonly
 */
export const NrNavStyle = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal'
};

/**
 *
 * @implements {NrModel}
 */
export class NrNav extends NrView {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.NAV;
    }

    /**
     *
     * @returns {typeof NrNavStyle}
     */
    static get Style () {
        return NrNavStyle;
    }

    /**
     *
     * @returns {typeof NrNav}
     */
    get Class () {
        return NrNav;
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
     * @param [style] {NrNavStyle|string}
     * @param [content] {Array.<NrModel>} Navigation items
     * @param [action] {NrModel} The click action, which will have selected value in the payload
     */
    constructor ({
        id = undefined
        , style = 'vertical'
        , content = []
        , action = undefined
    } = {}) {

        if ( id !== undefined && !_.isString(id) ) {
            throw new TypeError(`new ${NrNav.nrName}(): id invalid: "${id}"`);
        }

        if ( !_.isString(style) ) {
            throw new TypeError(`new ${NrNav.nrName}(): style invalid: "${style}"`);
        }

        // FIXME: This should check also NrModel interface
        if ( content !== undefined && !_.isArray(content) ) {
            throw new TypeError(`new ${NrNav.nrName}(): content invalid: "${content}"`);
        }

        if ( action !== undefined && !NrModelUtils.isModel(action) ) {
            throw new TypeError(`new ${NrNav.nrName}(): action invalid: "${action}"`);
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
         * @member {NrNavStyle|string}
         * @protected
         */
        this._style = style;

        /**
         *
         * @member {ReadonlyArray.<NrModel>}
         * @protected
         */
        this._content = Object.freeze(_.concat([], content));

        /**
         *
         * @member {NrModel|undefined}
         * @protected
         */
        this._action = action;

    }

    /**
     *
     * @returns {string}
     */
    get type () {
        return NrObjectType.NAV;
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
     * @returns {NrNavStyle|string}
     */
    get style () {
        return this._style;
    }

    /**
     *
     * @returns {ReadonlyArray.<NrModel>}
     */
    get content () {
        return this._content;
    }

    /**
     *
     * @returns {NrModel}
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
            type: this.type
            , id: this._id
            , style: this._style
            , action: this._action
            , content: _.map(this._content, item => item.valueOf())
        };
    }

    /**
     *
     * @param value {*}
     * @returns {NrNav}
     */
    static parseValue (value) {

        if ( !value ) {
            throw new TypeError(`${this.nrName}.parseValue(): value was not defined`);
        }

        if ( value instanceof NrNav ) {
            return value;
        }

        const {
            type
            , id
            , style
            , content
            , action
        } = value;

        if ( type !== NrObjectType.NAV ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        if ( !_.isString(style) ) {
            throw new TypeError(`${NrNav.nrName}().parseValue(): value's style invalid: "${style}"`);
        }

        // FIXME: This should check value.content items NrModel interface
        if ( !_.isNil(content) && !_.isArray(content) ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's content is not correct: "${content}"`);
        }

        return new NrNav({
              id        : !_.isNil(id)       ? id                                                    : undefined
            , style
            , action    : !_.isNil(action)   ? NrModelUtils.parseValue(action)                       : undefined
            , content   : !_.isNil(content)  ? _.map(content, item => NrModelUtils.parseValue(item)) : undefined
        });

    }

}

export default NrNav;
