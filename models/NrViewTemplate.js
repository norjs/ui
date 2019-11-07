/**
 * Describes an interface for view templates.
 *
 * This is used in the NorJS Edge Backend.
 *
 * @interface
 */
export class NrViewTemplate {

    init () {}

    destroy () {}

    /**
     *
     * @returns {NrModel}
     */
    render () {}

}

// noinspection JSUnusedGlobalSymbols
export default NrViewTemplate;
