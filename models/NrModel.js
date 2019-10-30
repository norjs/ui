/**
 * @interface
 */
export class NrModel {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return "";
    }

    /**
     *
     * @returns {typeof NrModel}
     */
    get Class () {
        return NrModel;
    }

    /**
     *
     * @returns {string}
     */
    get nrName () {
        return this.Class.nrName;
    }

    /**
     *
     * @returns {Object}
     */
    valueOf () {
        return {};
    }

    /**
     *
     * @param value {*}
     * @returns {NrModel}
     */
    static parseValue (value) {}

}

// noinspection JSUnusedGlobalSymbols
export default NrModel;
