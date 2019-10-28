/**
 *
 * @abstract
 */
export class NrView {

    /**
     *
     * @returns {string}
     * @abstract
     */
    static get nrName () {}

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
     * @returns {typeof NrView}
     * @abstract
     */
    get Class () {}

    /**
     *
     * @returns {string}
     * @abstract
     */
    get type () {}

    /**
     *
     * @returns {Object}
     * @abstract
     */
    valueOf () {}

    /**
     *
     * @returns {Object}
     */
    toJSON () {
        return this.valueOf();
    }

}

// noinspection JSUnusedGlobalSymbols
export default NrView;
