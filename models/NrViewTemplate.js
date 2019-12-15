/**
 * Describes an interface for view templates.
 *
 * This is used in the NorJS Edge Backend.
 *
 * Each session usually will have its own view template.
 *
 * @interface
 */
export class NrViewTemplate {

    /**
     * Initializes the view template after first request to new session or each time for non-session requests.
     *
     * This is called once after NorJS has initialized the template using component's bindings configuration.
     *
     * It can return a promise, in which case the promise will be waited until the request is done.
     */
    init () {}

    /**
     * Destroys the view template when session is destroyed, or for non-session requests each time the request ends.
     *
     * You should delete any references to outside objects here.
     *
     * You may start asynchronic operations, but you should not return a promise. Deletion should be instant.
     *
     * The same object should not be used after it has been destroyed.
     */
    destroy () {}

    /**
     * Renders the view. This is called once for each request.
     *
     * @param result {*} The result from the controller
     * @returns {NrModel}
     */
    render (result) {}

}

// noinspection JSUnusedGlobalSymbols
export default NrViewTemplate;
