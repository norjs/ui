
/**
 * @enum {string}
 * @readonly
 */
export const NrEventName = {

    /**
     * Triggered to parent scopes when `nr-nav` was configured without a click callback.
     *
     * The event string is "NrNav:onClick".
     *
     * The event arguments are:
     *
     *   1. Angular's Event Object -- includes the event name in `event.name`
     *   2. {*} The item which was clicked; same type as provided to the `nr-nav`'s collection
     *   3. {NrNavController} The nr-nav controller
     *
     * @fixme: Check out which is type for AngularJS event
     */
    NAV_CLICK: 'NrNav:onClick',

    /**
     * Triggered to parent scopes when `nr-form` was configured without a submit callback.
     *
     * The event string is "NrForm:onSubmit".
     *
     * The event arguments are:
     *
     *   1. Angular's Event Object -- includes the event name in `event.name`
     *   2. {Object} The payload which was submitted
     *   3. {NrFormController} The nr-form controller
     *
     * @fixme: Check out which is type for AngularJS event
     */
    FORM_SUBMIT: 'NrForm:onSubmit',

    /**
     * Triggered to parent scopes when `nr-form` was configured without a cancel callback.
     *
     * The event string is "NrForm:onCancel".
     *
     * The event arguments are:
     *
     *   1. Angular's Event Object -- includes the event name in `event.name`
     *   2. {Object} The payload which was cancelled
     *   3. {NrFormController} The nr-form controller
     *
     * @fixme: Check out which is type for AngularJS event
     */
    FORM_CANCEL: 'NrForm:onCancel',

    /**
     * Triggered to parent scopes when `nr-button` was configured without a click callback.
     *
     * The event string is "NrButton:onClick".
     *
     * The event arguments are:
     *
     *   1. Angular's Event Object -- includes the event name in `event.name`
     *   2. {NrButtonController} The nr-button controller
     *
     * @fixme: Check out which is type for AngularJS event
     */
    BUTTON_CLICK: 'NrButton:onClick',

    /**
     * Session has been changed. (Eg. authenticated/unauthenticated.)
     */
    SESSION_CHANGED: 'NrSession:changed',

    /**
     * The nav has been changed and should be reloaded
     */
    NAV_CHANGED: 'BeNavComponent:nav:changed',

    /**
     * Backend asks to move to this model view
     */
    OPEN_MODEL_VIEW: 'NrModel:open'

};

// noinspection JSUnusedGlobalSymbols
export default NrEventName;
