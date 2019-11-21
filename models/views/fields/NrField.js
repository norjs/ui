import "../../NrModel.js";

/**
 *
 * @abstract
 * @implements {NrModel}
 */
export class NrField {

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
     * @returns {typeof NrField}
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
     * @returns {string}
     * @abstract
     */
    get label () {}

    /**
     *
     * @returns {NrIcon}
     * @abstract
     */
    get icon () {}

    /**
     *
     * @returns {string}
     */
    get name () {}

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

    /**
     *
     * @param value {*}
     * @returns {NrField}
     * @abstract
     */
    static parseValue (value) {}

}

// noinspection JSUnusedGlobalSymbols
export default NrField;
