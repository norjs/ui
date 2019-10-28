import NrObjectType from "./NrObjectType";

/**
 *
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
    static parseModel (value) {

        if ( !value ) {
            throw new TypeError(`${this.nrName}.parseValue(): value was not defined`);
        }

        if ( value.type !== NrObjectType.USER ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${value.type}"`);
        }

        return new NrUser({
            email: value.email
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrUser;
