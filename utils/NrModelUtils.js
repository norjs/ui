import _ from 'lodash';
import LogUtils from "@norjs/utils/Log";

import NrObjectType from "../models/NrObjectType";
import NrResponse from "../models/NrResponse";
import NrRequest from "../models/NrRequest";
import NrSession from "../models/NrSession";
import NrConfirmDialog from "../models/views/NrConfirmDialog";
import NrInfoMessage from "../models/views/NrInfoMessage";
import NrForm from "../models/views/NrForm";
import NrTextField from "../models/views/fields/NrTextField";
import NrPasswordField from "../models/views/fields/NrPasswordField";
import NrView from "../models/views/NrView";
import NrUser from "../models/NrUser";
import NrMessage from "../models/views/NrMessage";
import NrErrorMessage from "../models/views/NrErrorMessage";
import NrIcon from "../models/NrIcon";
import NrCheckboxField from "../models/views/fields/NrCheckboxField";
import NrTextareaField from "../models/views/fields/NrTextareaField";
import NrNumberField from "../models/views/fields/NrNumberField";
import NrSelectField from "../models/views/fields/NrSelectField";

const nrLog = LogUtils.getLogger("NrModelUtils");

/**
 *
 * @type {boolean}
 */
let IS_INITIALIZED = false;

/**
 * Globally registered model classes.
 *
 * These are used by `NrModelUtils.parseValue(value)`.
 *
 * @type {Object.<NrObjectType|string, NrModel>}
 */
const REGISTERED_TYPES = {};

/**
 * Utilities for NrModels
 */
export class NrModelUtils {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return "NrModelUtils";
    }

    /**
     * Converts the value as a plain object (using `model.valueOf()` method if it exists).
     *
     * @param model {*}
     * @returns {Object|undefined|null|number|Array|boolean}
     */
    static valueOf (model) {

        if ( model && _.isFunction(model.valueOf) ) {
            return model.valueOf();
        }

        return model;

    }

    /**
     *
     */
    static registerDefaultModels () {

        IS_INITIALIZED = true;

        NrModelUtils.registerModel(NrResponse);
        NrModelUtils.registerModel(NrUser);
        NrModelUtils.registerModel(NrSession);
        NrModelUtils.registerModel(NrRequest);
        NrModelUtils.registerModel(NrIcon);
        NrModelUtils.registerModel(NrForm);
        NrModelUtils.registerModel(NrInfoMessage);
        NrModelUtils.registerModel(NrErrorMessage);
        NrModelUtils.registerModel(NrConfirmDialog);
        NrModelUtils.registerModel(NrPasswordField);
        NrModelUtils.registerModel(NrTextField);
        NrModelUtils.registerModel(NrCheckboxField);
        NrModelUtils.registerModel(NrTextareaField);
        NrModelUtils.registerModel(NrNumberField);
        NrModelUtils.registerModel(NrSelectField);

    }

    /**
     *
     * @param typeName {NrObjectType|string}
     * @param typeClass {NrModel}
     */
    static registerModel (typeClass, typeName = typeClass.nrName) {

        if ( !this.isModelClass(typeClass) ) {
            throw new TypeError(`${this.nrName}.registerModel(): typeClass not a class implementing NrModel interface: ${typeClass}`);
        }

        if (!_.isString(typeName)) {
            throw new TypeError(`${this.nrName}.registerModel(): typeName not a string: ${typeName}`);
        }

        if (this.isModelRegistered(typeName)) {
            throw new TypeError(`${this.nrName}.registerModel(): typeName exists already: ${typeName}`);
        }

        this._initialize();

        REGISTERED_TYPES[typeName] = typeClass;

    }

    // noinspection JSUnusedGlobalSymbols
    /**
     *
     * @param typeName {NrObjectType|string}
     */
    static unregisterModel (typeName) {

        if (this.isModelRegistered(typeName)) {
            delete REGISTERED_TYPES[typeName];
        }

    }

    /**
     *
     * @private
     */
    static _initialize () {

        if (IS_INITIALIZED === false) {
            this.registerDefaultModels();
        }

    }

    /**
     *
     * @param typeName {NrObjectType|string}
     * @returns {boolean}
     */
    static isModelRegistered (typeName) {

        this._initialize();

        return Object.prototype.hasOwnProperty.call(REGISTERED_TYPES, typeName);

    }

    /**
     * Parses a variable as a model object.
     *
     * @param value {*}
     * @returns {NrUser|NrSession|NrResponse|NrRequest|NrMessage|NrForm|NrConfirmDialog|NrTextField|NrPasswordField}
     */
    static parseValue (value) {

        if ( !value ) {
            throw new TypeError(`${this.nrName}.parseValue(): value was not defined: ${value}`);
        }

        const { type } = value;

        if (!(type && _.isString(type))) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        const typeParts = type.split(":");
        const typeFirstPart = typeParts[0];

        const Class = this.isModelRegistered(typeFirstPart) ? REGISTERED_TYPES[typeFirstPart] : undefined;

        if ( !Class ) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is unsupported: "${type}"`);
        }

        nrLog.trace(`parseValue(): type "${type}" ==> ${typeFirstPart}`);

        return Class.parseValue(value);

    }

    // noinspection JSUnusedGlobalSymbols
    /**
     *
     * Use .parseValue(value) instead.
     *
     * @deprecated
     * @param value
     * @returns {NrUser|NrSession|NrResponse|NrRequest|NrMessage|NrForm|NrConfirmDialog|NrTextField|NrPasswordField}
     */
    static parseModel (value) {
        return this.parseValue(value);
    }

    /**
     *
     * @param value {*}
     * @returns {boolean}
     */
    static isConfirmDialog (value) {
        return !!( value && value instanceof NrConfirmDialog );
    }

    /**
     *
     * @param value {*}
     * @returns {boolean}
     */
    static isForm (value) {
        return !!( value && value instanceof NrForm );
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     *
     * @param value {*}
     * @returns {boolean}
     */
    static isInfoMessage (value) {
        return !!( value && value instanceof NrInfoMessage );
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     *
     * @param value {*}
     * @returns {boolean}
     */
    static isErrorMessage (value) {
        return !!( value && value instanceof NrErrorMessage );
    }

    /**
     *
     * @param value {*}
     * @returns {boolean}
     */
    static isMessage (value) {
        return !!( value && value instanceof NrMessage );
    }

    /**
     *
     * @param value {*}
     * @returns {boolean}
     */
    static isTextField (value) {
        return !!( value && value instanceof NrTextField );
    }

    /**
     *
     * @param value {*}
     * @returns {boolean}
     */
    static isPasswordField (value) {
        return !!( value && value instanceof NrPasswordField );
    }

    /**
     *
     * @param value {*}
     * @returns {boolean}
     */
    static isCheckboxField (value) {
        return !!( value && value instanceof NrCheckboxField );
    }

    /**
     *
     * @param value {*}
     * @returns {boolean}
     */
    static isTextareaField (value) {
        return !!( value && value instanceof NrTextareaField );
    }

    /**
     *
     * @param value {*}
     * @returns {boolean}
     */
    static isNumberField (value) {
        return !!( value && value instanceof NrNumberField );
    }

    /**
     *
     * @param value {*}
     * @returns {boolean}
     */
    static isSelectField (value) {
        return !!( value && value instanceof NrSelectField );
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     *
     * @param value {NrView|*}
     * @returns {boolean}
     */
    static isView (value) {
        return value instanceof NrView;
    }

    /**
     * Returns `true` if value is a class implementing NrModel interface.
     *
     * @param Class {typeof NrModel|*}
     * @returns {boolean}
     */
    static isModelClass (Class) {

        return !!( Class && _.isString(Class.nrName) && _.isFunction(Class.parseValue) );

    }

    /**
     * Returns `true` if value is an instance implementing NrModel interface.
     *
     * @param value {NrModel|*}
     * @returns {boolean}
     */
    static isModel (value) {

        return !!( value && _.isString(value.nrName) && _.isFunction(value.valueOf) && this.isModelClass(value.Class) );

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrModelUtils;
