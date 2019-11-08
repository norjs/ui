import LogUtils from "@norjs/utils/Log";
import NrServiceName from "../NrServiceName";
import NrModelUtils from "../../utils/NrModelUtils";
import NrAttribute from "../NrAttribute";
import NrTag from "../NrTag";
import NrErrorMessage from "../../models/views/NrErrorMessage";

const nrLog = LogUtils.getLogger(NrServiceName.MODEL_COMPONENT);

const PRIVATE = {

};

/**
 * Service which you can use to check which component handles your model.
 */
export class NrModelComponentService {

    static get nrName () {
        return NrServiceName.MODEL_COMPONENT;
    }

    get Class () {
        return NrModelComponentService;
    }

    get nrName () {
        return this.Class.nrName;
    }

    /**
     *
     * @ngInject
     */
    constructor () {}

    /**
     * Get component name and resolve params for this model object.
     *
     * @param model {NrModel}
     * @return {{component: NrTag|string, resolve: Object}|undefined}
     */
    getComponentConfig (model) {

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

        if (NrModelUtils.isForm(model)) {
            return {
                component: NrTag.FORM,
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
    getComponentFromError (err) {

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
     * @fixme This should be in its own service
     */
    _getErrorKey (err) {

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
    _stringifyValue (value) {
        let words = _.trim(`${value}`.replace(/[^a-zA-Z0-9]+/g, " ").replace(/ +/g, " ")).split(' ');
        if (words.length > 10) {
            words = words.splice(0, 10);
        }
        return words.join('-');
    }

}

// noinspection JSUnusedGlobalSymbols
export default NrModelComponentService;
