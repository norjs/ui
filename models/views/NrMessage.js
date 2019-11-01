import NrView from "./NrView.js";

/**
 *
 * @abstract
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

}

// noinspection JSUnusedGlobalSymbols
export default NrMessage;
