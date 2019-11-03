import _ from 'lodash';
import "./NrModel";
import NrObjectType from "./NrObjectType";

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
     * @param id {string}
     */
    constructor ({
        email = undefined
    } = {}) {

        if ( email !== undefined && !_.isString(email) ) {
            throw new TypeError(`new ${NrUser.nrName}(): email invalid: "${email}"`);
        }

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

        const { email } = value;

        return new NrUser({
            email: !_.isNil(email) ? email : undefined
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrUser;
