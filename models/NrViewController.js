/**
 * Describes an interface for view controllers.
 *
 * This is used in the NorJS Edge Backend.
 *
 * @interface
 */
export class NrViewController {

    /**
     * @returns {string}
     */
    static get nrName () {}

    /**
     * @returns {typeof NrViewController}
     */
    get Class () {}

    /**
     * @returns {string}
     */
    get nrName () {}

    constructor () {}

    /**
     *
     */
    init () {}

    /**
     *
     */
    destroy () {}

}

// noinspection JSUnusedGlobalSymbols
export default NrViewController;
