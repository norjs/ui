import _ from 'lodash';
import "./NrModel";
import NrObjectType from "./NrObjectType";
import LogUtils from "@norjs/utils/Log";

/**
 *
 * @implements {NrModel}
 */
export class NrUser {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.USER;
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
     * @returns {typeof NrUser}
     */
    get Class () {
        return NrUser;
    }

    /**
     *
     * @param [id] {string}
     * @param [version] {number}
     * @param [email] {string}
     * @param [name] {string}
     */
    constructor ({
        id = undefined,
        version = 0,
        email = undefined
    } = {}) {

        if ( id !== undefined && !(id && _.isString(id)) ) {
            throw new TypeError(`new ${NrUser.nrName}(): id invalid: ${LogUtils.getAsString(id)}`);
        }

        if ( !_.isNumber(version) ) {
            throw new TypeError(`new ${NrUser.nrName}(): version invalid: ${LogUtils.getAsString(version)}`);
        }

        if ( email !== undefined && !_.isString(email) ) {
            throw new TypeError(`new ${NrUser.nrName}(): email invalid: "${email}"`);
        }

        /**
         *
         * @member {string}
         * @protected
         */
        this._id = id;

        /**
         *
         * @member {number}
         * @protected
         */
        this._version = version;

        /**
         *
         * @member {string|undefined}
         * @protected
         */
        this._email = email;

    }

    /**
     *
     * @returns {NrObjectType|string}
     */
    get type () {
        return NrObjectType.USER;
    }

    /**
     *
     *
     * @returns {string|undefined}
     */
    get id () {
        return this._id;
    }

    /**
     *
     * @returns {number|undefined}
     */
    get version () {
        return this._version;
    }

    /**
     *
     * @returns {string}
     */
    get email () {
        return this._email;
    }

    /**
     *
     * @returns {Object}
     */
    valueOf () {
        return {
            type: this.type,
            id: this._id,
            version: this._version,
            email: this._email ? this._email : null
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
     * @param value {*}
     * @returns {NrUser}
     */
    static parseValue (value) {

        if ( !value ) {
            throw new TypeError(`${this.nrName}.parseValue(): value was not defined`);
        }

        if ( value instanceof NrUser ) {
            return value;
        }

        if ( value.type !== NrObjectType.USER ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${value.type}"`);
        }

        const {
            id,
            version,
            email
        } = value;

        return new NrUser({
            id      : !_.isNil(id)    ? id    : undefined,
            version : version,
            email   : !_.isNil(email) ? email : undefined
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrUser;
