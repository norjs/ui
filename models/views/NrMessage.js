import NrView from "./NrView.js";

/**
 *
 * @abstract
 * @implements {NrModel}
 */
export class NrMessage extends NrView {

    /**
     *
     * @returns {typeof NrMessage}
     * @abstract
     */
    get Class () {}

    /**
     *
     * @returns {string}
     */
    get label () {}

    /**
     *
     * @returns {string|undefined}
     */
    get content () {}

    /**
     *
     * @returns {NrIcon}
     */
    get icon () {}

    /**
     *
     * @param value {*}
     * @returns {NrMessage}
     * @abstract
     */
    static parseValue (value) {}

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

}

// noinspection JSUnusedGlobalSymbols
export default NrMessage;
