import _ from 'lodash';
import NrObjectType from "../NrObjectType";
import NrView from "./NrView";
import NrModelUtils from "../../utils/NrModelUtils";
import NrIcon from "../NrIcon";
import NrButton from "./NrButton";

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
 * @implements {NrModel}
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
     * @param [label] {string}  The label of the form
     * @param [icon] {NrIcon} Icon for form
     * @param [payload] {Object} The payload object (eg. form field data object)
     * @param [submit] {NrModel} The submit action
     * @param [submitButton] {NrButton} The submit button model
     * @param [cancelButton] {NrButton} The cancel button model
     * @param [cancel] {NrModel} The cancel action
     * @param [content] {Array.<NrView>} Form fields
     */
    constructor ({
        label = undefined
        , icon = undefined
        , payload = undefined
        , submit = undefined
        , cancel = undefined
        , content = []
        , submitButton = undefined
        , cancelButton = undefined
    } = {}) {

        if ( label !== undefined && !_.isString(label) ) {
            throw new TypeError(`new ${NrForm.nrName}(): label invalid: "${label}"`);
        }

        if ( icon !== undefined && !(icon instanceof NrIcon) ) {
            throw new TypeError(`new ${NrForm.nrName}(): icon invalid: "${icon}"`);
        }

        if ( payload !== undefined && !_.isObject(payload) ) {
            throw new TypeError(`new ${NrForm.nrName}(): payload invalid: "${payload}"`);
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

        if ( submitButton !== undefined && !NrModelUtils.isButton(submitButton) ) {
            throw new TypeError(`new ${NrForm.nrName}(): submitButton invalid: "${submitButton}"`);
        }

        if ( cancelButton !== undefined && !NrModelUtils.isButton(cancelButton) ) {
            throw new TypeError(`new ${NrForm.nrName}(): cancelButton invalid: "${cancelButton}"`);
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
         * @member {Object|undefined}
         * @protected
         */
        this._payload = payload;

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

        /**
         *
         * @member {NrButton|undefined}
         * @protected
         */
        this._submitButton = submitButton;

        /**
         *
         * @member {NrButton|undefined}
         * @protected
         */
        this._cancelButton = cancelButton;

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
     * @returns {Object}
     */
    get payload () {
        return this._payload;
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
     * @returns {NrButton}
     */
    get submitButton () {
        return this._submitButton;
    }

    /**
     *
     * @returns {NrButton}
     */
    get cancelButton () {
        return this._cancelButton;
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
            , submit: !_.isNil(this._submit) ? this._submit.valueOf() : null
            , cancel: !_.isNil(this._cancel) ? this._cancel.valueOf() : null
            , payload: this._payload
            , content: _.map(this._content, item => item.valueOf())
            , submitButton: !_.isNil(this._submitButton) ? this._submitButton.valueOf() : null
            , cancelButton: !_.isNil(this._cancelButton) ? this._cancelButton.valueOf() : null
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
            , payload
            , submitButton
            , cancelButton
        } = value;

        if ( type !== NrObjectType.FORM ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        // FIXME: This should check value.content items NrView interface
        if ( !_.isNil(content) && !_.isArray(content) ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's content is not correct: "${content}"`);
        }

        return new NrForm({
              label         : !_.isNil(label)          ? label                              : undefined
            , icon          : !_.isNil(icon)           ? NrIcon.parseValue(icon)            : undefined
            , payload       : !_.isNil(payload)        ? payload                            : undefined
            , submit        : !_.isNil(submit)         ? NrModelUtils.parseValue(submit)    : undefined
            , cancel        : !_.isNil(cancel)         ? NrModelUtils.parseValue(cancel)    : undefined
            , content       : !_.isNil(content)        ? _.map(content, item => NrModelUtils.parseValue(item)) : undefined
            , submitButton  : !_.isNil(submitButton)   ? NrButton.parseValue(submitButton)  : undefined
            , cancelButton  : !_.isNil(cancelButton)   ? NrButton.parseValue(cancelButton)  : undefined

        });

    }

}

export default NrForm;
