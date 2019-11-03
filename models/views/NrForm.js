import _ from 'lodash';
import NrObjectType from "../NrObjectType";
import NrView from "./NrView";
import NrModelUtils from "../../utils/NrModelUtils";
import NrIcon from "../NrIcon";

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
     * @param label {string}
     * @param icon {NrIcon}
     * @param submit {NrModel}
     * @param cancel {NrModel}
     * @param content {Array.<NrView>}
     */
    constructor ({
        label = undefined
        , icon = undefined
        , submit = undefined
        , cancel = undefined
        , content = []
    } = {}) {

        if ( label !== undefined && !_.isString(label) ) {
            throw new TypeError(`new ${NrForm.nrName}(): label invalid: "${label}"`);
        }

        if ( icon !== undefined && !(icon instanceof NrIcon) ) {
            throw new TypeError(`new ${NrForm.nrName}(): icon invalid: "${icon}"`);
        }

        if ( submit !== undefined && !NrModelUtils.isModel(submit) ) {
            throw new TypeError(`new ${NrForm.nrName}(): submit invalid: "${submit}"`);
        }

        if ( cancel !== undefined && !NrModelUtils.isModel(cancel) ) {
            throw new TypeError(`new ${NrForm.nrName}(): cancel invalid: "${cancel}"`);
        }

        // FIXME: This should check also NrView interface
        if ( content !== undefined && !_.isArray(content) ) {
            throw new TypeError(`new ${NrForm.nrName}(): content invalid: "${content}"`);
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
        this._submit = submit;

        /**
         *
         * @member {NrModel|undefined}
         * @protected
         */
        this._cancel = cancel;

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
            , label: this._label
            , icon: !_.isNil(this._icon) ? this._icon.valueOf() : null
            , submit: this._submit
            , cancel: this._cancel
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
            , label
            , icon
            , submit
            , cancel
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
              label     : !_.isNil(label)    ? label                            : undefined
            , icon      : !_.isNil(icon)     ? NrIcon.parseValue(icon)          : undefined
            , submit    : !_.isNil(submit)   ? NrModelUtils.parseValue(submit)  : undefined
            , cancel    : !_.isNil(cancel)   ? NrModelUtils.parseValue(cancel)  : undefined
            , content   : !_.isNil(content)  ? _.map(content, item => NrModelUtils.parseValue(item)) : undefined
        });

    }

}

export default NrForm;
