
/**
 * Work Assistant HTTP status numbers
 *
 * @enum {number}
 * @readonly
 */
export const NrHttpStatusCode = {

    /**
     * Authentication error, eg. invalid username or password (403)
     */
    AUTHENTICATION_ERROR : 403,

    /**
     * Invalid Session ID (403)
     */
    INVALID_SESSION_ID : 403,

    /**
     * Invalid authToken (403)
     */
    INVALID_AUTH_TOKEN : 403

};

// noinspection JSUnusedGlobalSymbols
export default NrHttpStatusCode;
