/**
 * @interface
 */
export class NrModel {

    /**
     *
     * @returns {string}
     */
    static get nrName () {}

    /**
     *
     * @returns {typeof NrModel}
     */
    get Class () {}

    /**
     *
     * @returns {string}
     */
    get nrName () {}

    /**
     *
     * @returns {Object}
     */
    valueOf () {}

    /**
     *
     * @param value {*}
     * @returns {NrModel}
     */
    static parseValue (value) {}

}

// noinspection JSUnusedGlobalSymbols
export default NrModel;
