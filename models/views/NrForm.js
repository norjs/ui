import _ from 'lodash';
import NrObjectType from "../NrObjectType";
import NrView from "./NrView";
import NrModelUtils from "../../utils/NrModelUtils";

/**
 *
 * @enum {string}
 * @readonly
 */
export const NrFormPayloadType = {

    JSON: "json"

};

/**
 *
 */
export class NrForm extends NrView {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.FORM;
    }

    /**
     *
     * @returns {typeof NrForm}
     */
    get Class () {
        return NrForm;
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
     * @param submit {NrModel}
     * @param cancel {NrModel}
     * @param label {string}
     * @param content {Array.<NrView>}
     */
    constructor ({
        submit = undefined
        , cancel = undefined
        , label = undefined
        , content = []
    } = {}) {

        if ( submit !== undefined && !NrModelUtils.isModel(submit) ) {
            throw new TypeError(`new ${NrForm.nrName}(): submit invalid: "${submit}"`);
        }

        if ( cancel !== undefined && !NrModelUtils.isModel(cancel) ) {
            throw new TypeError(`new ${NrForm.nrName}(): cancel invalid: "${cancel}"`);
        }

        if ( label !== undefined && !_.isString(label) ) {
            throw new TypeError(`new ${NrForm.nrName}(): label invalid: "${label}"`);
        }

        // FIXME: This should check also NrView interface
        if ( content !== undefined && !_.isArray(content) ) {
            throw new TypeError(`new ${NrForm.nrName}(): content invalid: "${content}"`);
        }

        super();

        /**
         *
         * @member {NrModel|undefined}
         * @protected
         */
        this._submit = submit;

        /**
         *
         * @member {NrModel|undefined}
         * @protected
         */
        this._cancel = cancel;

        /**
         *
         * @member {string|undefined}
         * @protected
         */
        this._label = label;

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
        return NrObjectType.FORM;
    }

    /**
     *
     * @returns {NrModel}
     */
    get submit () {
        return this._submit;
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
     * @returns {string}
     */
    get label () {
        return this._label;
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
            , submit: this._submit
            , cancel: this._cancel
            , label: this._label
            , content: _.map(this._content, item => item.valueOf())
        };
    }

    /**
     *
     * @param value {*}
     * @returns {NrForm}
     */
    static parseValue (value) {

        if ( !value ) {
            throw new TypeError(`${this.nrName}.parseValue(): value was not defined`);
        }

        if ( value instanceof NrForm) {
            return value;
        }

        const {
            type
            , submit
            , cancel
            , label
            , content
        } = value;

        if ( type !== NrObjectType.FORM ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        // FIXME: This should check value.content items NrView interface
        if ( !_.isNil(content) && !_.isArray(content) ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's content is not correct: "${content}"`);
        }

        return new NrForm({
            submit    : !_.isNil(submit)   ? NrModelUtils.parseModel(submit)  : undefined
            , cancel  : !_.isNil(cancel)   ? NrModelUtils.parseModel(cancel)  : undefined
            , label   : !_.isNil(label)    ? label                            : undefined
            , content : !_.isNil(content)  ? _.map(content, item => NrModelUtils.parseModel(item)) : undefined
        });

    }

}

export default NrForm;
