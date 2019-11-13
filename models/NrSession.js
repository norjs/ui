import _ from 'lodash';
import "./NrModel";
import NrObjectType from "./NrObjectType";
import NrUser from "./NrUser";
import LogUtils from "@norjs/utils/Log";

/**
 *
 * @enum {string}
 * @readonly
 */
export const NrSessionId = {

    /**
     * This is a special ID value which means the backend will create a new session.
     */
    NEW: 'new'

};

/**
 *
 * @implements {NrModel}
 */
export class NrSession {

    /**
     *
     * @returns {typeof NrSessionId}
     */
    static get ID () {
        return NrSessionId;
    }

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.SESSION;
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
     * @returns {typeof NrSession}
     */
    get Class () {
        return NrSession;
    }

    /**
     *
     * @param [id] {string}
     * @param [version] {number}
     * @param [created] {string}
     * @param [user] {NrUser}
     */
    constructor ({
        id = undefined,
        version = 0,
        created = undefined,
        user = undefined
    } = {}) {

        if ( id !== undefined && !_.isString(id) ) {
            throw new TypeError(`new ${NrSession.nrName}(): id invalid: ${LogUtils.getAsString(id)}`);
        }

        if ( !_.isNumber(version) ) {
            throw new TypeError(`new ${NrSession.nrName}(): version invalid: ${LogUtils.getAsString(version)}`);
        }

        if ( created !== undefined && !_.isString(created) ) {
            throw new TypeError(`new ${NrSession.nrName}(): created invalid: ${LogUtils.getAsString(created)}`);
        }

        if ( user !== undefined && !(user instanceof NrUser) ) {
            throw new TypeError(`new ${NrSession.nrName}(): user invalid: ${LogUtils.getAsString(user)}`);
        }

        /**
         * Time when this session was created in a string.
         *
         * Eg. `'2019-10-25T06:56:44.281Z'`
         *
         * @member {string|undefined}
         * @protected
         */
        this._created = created;

        /**
         *
         * @member {string|undefined}
         * @protected
         */
        this._id = id;

        /**
         *
         * @member {Number|undefined}
         * @protected
         */
        this._version = version;

        /**
         *
         * @member {NrUser|undefined}
         * @protected
         */
        this._user = user;

    }

    /**
     *
     * @returns {NrObjectType|string}
     */
    get type () {
        return NrObjectType.SESSION;
    }

    /**
     * This is the ID of the session. Any request will generate a new session.
     *
     * @returns {string}
     */
    get created () {
        return this._created;
    }

    /**
     * This is the ID of the session. Any request will generate a new session.
     *
     * @returns {string}
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
     * @returns {NrUser}
     */
    get user () {
        return this._user;
    }

    /**
     *
     * @returns {boolean}
     */
    isAuthenticated () {
        return !!this._user;
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
            created: this._created,
            user: this._user ? this._user.valueOf() : null
        };
    }

    /**
     *
     * @returns {{created: string, id: string, type: (NrObjectType|string), user: null}}
     */
    toJSON () {
        return this.valueOf();
    }

    /**
     *
     * @param value {*}
     * @returns {NrSession}
     */
    static parseValue (value) {

        if ( !value ) {
            throw new TypeError(`${this.nrName}.parseValue(): value was not defined`);
        }

        if ( value instanceof NrSession ) {
            return value;
        }

        if ( value.type !== NrObjectType.SESSION ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${value.type}"`);
        }

        const {
            id
            , version
            , created
            , user
        } = value;

        return new NrSession({
            id        : !_.isNil(id)        ? id        : undefined,
            version   : version,
            created   : !_.isNil(created)   ? created   : undefined,
            user      : !_.isNil(user)      ? NrUser.parseValue(user) : undefined
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrSession;
