import _ from 'lodash';
import NrObjectType from "./NrObjectType";

/**
 * This is a bindings configuration object.
 *
 * It must be a regular object which has properties as key-value pairs.
 *
 * The key is a property name where to assign the value in a template or controller. If it starts with a dot (`"."`),
 * a function call will be used to set the value.
 *
 * The value is a name what to bind.
 *
 * Currently supported bind names:
 *
 *   - `$request`
 *   - `$session`
 *   - `$template`
 *   - `$controller`
 *
 * @todo Maybe implement a injector manager where these values are saved.
 * @typedef {Object.<string, string>} NrBindingsObject
 */

/**
 *
 */
export class NrViewComponent {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return NrObjectType.VIEW_COMPONENT;
    }

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
     * @returns {typeof NrViewComponent}
     */
    get Class () {
        return NrViewComponent;
    }

    /**
     *
     * @param [template] {NrViewTemplate|undefined}
     * @param [controller] {NrViewController|undefined} This should be class
     * @param [templateBindings] {NrBindingsObject|undefined}
     * @param [controllerBindings] {NrBindingsObject|undefined}
     */
    constructor ({
        template = undefined,
        controller = undefined,
        templateBindings = undefined,
        controllerBindings = undefined
    } = {}) {

        // FIXME: This should check for typeof NrViewTemplate
        if ( template !== undefined && !template ) {
            throw new TypeError(`new ${NrViewComponent.nrName}(): template invalid: "${template}"`);
        }

        // FIXME: This should check for typeof NrViewController
        if ( controller !== undefined && !controller ) {
            throw new TypeError(`new ${NrViewComponent.nrName}(): controller invalid: "${controller}"`);
        }

        if ( templateBindings !== undefined && !_.isPlainObject(templateBindings) ) {
            throw new TypeError(`new ${NrViewComponent.nrName}(): templateBindings invalid: "${templateBindings}"`);
        }

        if ( controllerBindings !== undefined && !_.isPlainObject(controllerBindings) ) {
            throw new TypeError(`new ${NrViewComponent.nrName}(): controllerBindings invalid: "${controllerBindings}"`);
        }

        /**
         *
         * @member {NrViewTemplate|undefined}
         * @protected
         */
        this._template = template;

        /**
         *
         * @member {NrViewController|undefined}
         * @protected
         */
        this._controller = controller;

        /**
         *
         * @member {NrBindingsObject|undefined}
         * @protected
         */
        this._templateBindings = templateBindings ? Object.freeze(templateBindings) : undefined;

        /**
         *
         * @member {NrBindingsObject|undefined}
         * @protected
         */
        this._controllerBindings = controllerBindings ? Object.freeze(controllerBindings) : undefined;

    }

    /**
     *
     * @returns {NrObjectType|string}
     */
    get type () {
        return NrObjectType.VIEW_COMPONENT;
    }

    /**
     *
     * @returns {typeof NrViewTemplate}
     */
    get template () {
        return this._template;
    }

    /**
     *
     * @returns {typeof NrViewController}
     */
    get controller () {
        return this._controller;
    }

    /**
     *
     * @returns {NrBindingsObject}
     */
    get templateBindings () {
        return this._templateBindings;
    }

    /**
     *
     * @returns {NrBindingsObject}
     */
    get controllerBindings () {
        return this._controllerBindings;
    }

}

// noinspection JSUnusedGlobalSymbols
export default NrViewComponent;
