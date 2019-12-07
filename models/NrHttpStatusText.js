
/**
 * Work Assistant HTTP status texts
 *
 * @enum {string}
 * @readonly
 */
export const NrHttpStatusText = {

    /**
     * Authentication error, eg. invalid username or password (`"waErrors.authenticationError"`)
     */
    AUTHENTICATION_ERROR : "waErrors.authenticationError",

    /**
     * Invalid Session ID (`"waErrors.invalidSessionId"`)
     */
    INVALID_SESSION_ID : "waErrors.invalidSessionId",

    /**
     * Invalid authToken, eg. credentials. (`"waErrors.invalidCredentials"`)
     */
    INVALID_AUTH_TOKEN : "waErrors.invalidCredentials"

};

// noinspection JSUnusedGlobalSymbols
export default NrHttpStatusText;
