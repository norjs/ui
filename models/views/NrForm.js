import _ from 'lodash';
import NrObjectType from "../NrObjectType";
import NrView from "./NrView";

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
     * @param target {string}
     * @param payloadType {string}
     * @param label {string}
     * @param content {Array.<NrView>}
     */
    constructor ({
        target = undefined,
        payloadType = undefined,
        label = undefined,
        content = []
    } = {}) {

        if ( target !== undefined && !_.isString(target) ) {
            throw new TypeError(`new ${NrForm.nrName}(): target invalid: "${target}"`);
        }

        if ( payloadType !== undefined && !_.isString(payloadType) ) {
            throw new TypeError(`new ${NrForm.nrName}(): payloadType invalid: "${payloadType}"`);
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
         * @member {string|undefined}
         * @protected
         */
        this._target = target;

        /**
         *
         * @member {string|undefined}
         * @protected
         */
        this._payloadType = payloadType;

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
     * @returns {string}
     */
    get target () {
        return this._target;
    }

    /**
     *
     * @returns {string}
     */
    get payloadType () {
        return this._payloadType;
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
            type: this.type,
            target: this._target,
            payloadType: this._payloadType,
            label: this._label,
            content: _.map(this._content, item => item.valueOf())
        };
    }

    /**
     *
     * @param value {*}
     * @returns {NrForm}
     */
    static parseValue (value) {
        // @TODO
    }

}

export default NrForm;
