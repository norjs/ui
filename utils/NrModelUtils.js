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
import {NrDiv} from "../models/views/NrDiv";
import NrTag from "../src/NrTag";
import NrAttribute from "../src/NrAttribute";
import {NrNav} from "../models/views/NrNav";
import {NrOption} from "../models/views/fields/NrOption";

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
        NrModelUtils.registerModel(NrDiv);
        NrModelUtils.registerModel(NrNav);
        NrModelUtils.registerModel(NrOption);

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

    /**
     *
     * @param value {*}
     * @returns {boolean}
     */
    static isDiv (value) {
        return !!( value && value instanceof NrDiv );
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

    /**
     *
     * @param value {*}
     * @returns {boolean}
     */
    static isNav (value) {
        return !!( value && value instanceof NrNav );
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

    /**
     * Get component name and resolve params for this model object.
     *
     * @param model {NrModel}
     * @return {{component: NrTag|string, resolve: Object}|undefined}
     */
    static getComponentConfig (model) {

        if (!model) {
            throw new TypeError(`${this.nrName}.getComponentConfig(): model not defined: ${LogUtils.getAsString(model)}`);
        }

        if (NrModelUtils.isConfirmDialog(model)) {
            return {
                component: NrTag.CONFIRM_DIALOG,
                resolve: {[NrAttribute.MODEL]: model}
            };
        }

        if (NrModelUtils.isTextField(model)) {
            return {
                component: NrTag.TEXT_INPUT,
                resolve: {[NrAttribute.MODEL]: model}
            };
        }

        if (NrModelUtils.isPasswordField(model)) {
            return {
                component: NrTag.PASSWORD_INPUT,
                resolve: {[NrAttribute.MODEL]: model}
            };
        }

        if (NrModelUtils.isCheckboxField(model)) {
            return {
                component: NrTag.CHECKBOX_INPUT,
                resolve: {[NrAttribute.MODEL]: model}
            };
        }

        if (NrModelUtils.isTextareaField(model)) {
            return {
                component: NrTag.TEXTAREA,
                resolve: {[NrAttribute.MODEL]: model}
            };
        }

        if (NrModelUtils.isNumberField(model)) {
            return {
                component: NrTag.NUMBER_INPUT,
                resolve: {[NrAttribute.MODEL]: model}
            };
        }

        if (NrModelUtils.isSelectField(model)) {
            return {
                component: NrTag.SELECT,
                resolve: {[NrAttribute.MODEL]: model}
            };
        }

        if (NrModelUtils.isNav(model)) {
            return {
                component: NrTag.NAV,
                resolve: {[NrAttribute.MODEL]: model}
            };
        }

        if (NrModelUtils.isForm(model)) {
            return {
                component: NrTag.FORM,
                resolve: {[NrAttribute.MODEL]: model}
            };
        }

        if (NrModelUtils.isDiv(model)) {
            return {
                component: NrTag.DIV,
                resolve: {[NrAttribute.MODEL]: model}
            };
        }

        if (NrModelUtils.isMessage(model)) {
            return {
                component: NrTag.MESSAGE,
                resolve: {[NrAttribute.MODEL]: model}
            };
        }

        return undefined;

    }

    /**
     *
     * @param err {*}
     * @return {{component: NrTag|string, resolve: Object}|undefined}
     */
    static getComponentFromError (err) {

        nrLog.trace(`.getComponentFromError(): Error: `, err);

        let config = this.getComponentConfig(err);

        if (!config) {
            config = this.getComponentConfig(new NrErrorMessage({
                label: `errors.${this._getErrorKey(err)}`
            }));
        }

        return config;

    }

    /**
     *
     * @param err {*}
     * @returns {string}
     * @private
     * @fixme This should be in its own utils
     */
    static _getErrorKey (err) {

        if (err.code) {
            return this._stringifyValue(err.code);
        }

        return this._stringifyValue(err);

    }

    /**
     * Parses any variable as a simple string keyword.
     *
     * @param value
     * @returns {string}
     * @private
     */
    static _stringifyValue (value) {
        let words = _.trim(`${value}`.replace(/[^a-zA-Z0-9]+/g, " ").replace(/ +/g, " ")).split(' ');
        if (words.length > 10) {
            words = words.splice(0, 10);
        }
        return words.join('-');
    }

    /**
     *
     * @param model {NrModel}
     * @return {string}
     */
    static getModelId (model) {

        if (!model) throw new TypeError(`${this.nrName}.getId(): Model not defined: ${model}`);

        return model.id || model.name || model.label;

    }

    /**
     *
     * @param model {NrModel}
     * @returns {string}
     */
    static getModelLabel (model) {
        return model.label;
    }

    /**
     *
     * @param model {NrModel}
     * @returns {string}
     */
    static getModelHref (model) {

        if (model instanceof NrOption && model.value) {
            return this.getModelHref(model.value);
        }

        return model ? model.href : undefined;

    }

    /**
     *
     * @param model {NrModel}
     * @returns {NrIcon|string}
     */
    static getModelIcon (model) {

        if (model instanceof NrIcon) {
            return model;
        }

        return model && model.icon ? model.icon : undefined;
    }

    /**
     *
     * @param model {NrModel}
     * @returns {NrIconValue|string}
     */
    static getModelIconValue (model) {

        if (model instanceof NrIcon) {
            return model.value;
        }

        return model && model.icon ? model.icon.value : undefined;

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrModelUtils;
