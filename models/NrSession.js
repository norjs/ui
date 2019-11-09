import _ from 'lodash';
import "./NrModel";
import NrObjectType from "./NrObjectType";
import NrUser from "./NrUser";

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
     * @param [authToken] {string}
     * @param [created] {string}
     * @param [user] {NrUser}
     */
    constructor ({
        id = undefined,
        authToken = undefined,
        created = undefined,
        user = undefined
    } = {}) {

        if ( id !== undefined && !_.isString(id) ) {
            throw new TypeError(`new ${NrSession.nrName}(): id invalid: "${id}"`);
        }

        if ( authToken !== undefined && !_.isString(authToken) ) {
            throw new TypeError(`new ${NrSession.nrName}(): authToken invalid: "${authToken}"`);
        }

        if ( created !== undefined && !_.isString(created) ) {
            throw new TypeError(`new ${NrSession.nrName}(): created invalid: "${created}"`);
        }

        if ( user !== undefined && !(user instanceof NrUser) ) {
            throw new TypeError(`new ${NrSession.nrName}(): user invalid: "${user}"`);
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
         * @member {string|undefined}
         * @protected
         */
        this._authToken = authToken;

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

    // noinspection JSUnusedGlobalSymbols
    /**
     *
     * @returns {string}
     */
    get authToken () {
        return this._authToken;
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
        return !!this._authToken;
    }

    /**
     *
     * @returns {Object}
     */
    valueOf () {
        return {
            type: this.type,
            id: this._id,
            created: this._created,
            authToken: this._authToken,
            user: this._user ? this._user.valueOf() : null
        };
    }

    /**
     *
     * @returns {{created: string, authToken: string, id: string, type: (NrObjectType|string), user: null}}
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
            , created
            , authToken
            , user
        } = value;

        return new NrSession({
            id        : !_.isNil(id)        ? id        : undefined,
            created   : !_.isNil(created)   ? created   : undefined,
            authToken : !_.isNil(authToken) ? authToken : undefined,
            user      : !_.isNil(user)      ? NrUser.parseValue(user) : undefined
        });

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrSession;
