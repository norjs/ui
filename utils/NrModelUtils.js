import _ from 'lodash';
import NrObjectType from "../models/NrObjectType";
import NrResponse from "../models/NrResponse";
import NrRequest from "../models/NrRequest";
import NrSession from "../models/NrSession";
import NrConfirmDialog from "../models/views/NrConfirmDialog";
import NrInfoMessage from "../models/views/NrInfoMessage";
import NrForm from "../models/views/NrForm";
import NrTextField from "../models/views/fields/NrTextField";
import NrPasswordField from "../models/views/fields/NrPasswordField";
import LogUtils from "@norjs/utils/Log";

const nrLog = LogUtils.getLogger("NrModelUtils");

export class NrModelUtils {

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
     * Parses a variable as a model instance.
     *
     * @param value {*}
     * @returns {NrUser|NrSession|NrResponse|NrRequest|NrInfoMessage|NrForm|NrConfirmDialog|NrTextField|NrPasswordField}
     */
    static parseModel (value) {

        if ( !value ) {
            throw new TypeError(`${this.nrName}.parseValue(): value was not defined: ${value}`);
        }

        const { type } = value;

        if (!(type && _.isString(type))) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${type}"`);
        }

        const typeParts = type.split(":");
        const typeFirstPart = typeParts[0];

        switch (typeFirstPart) {

            case NrObjectType.REQUEST:
                nrLog.trace(`parseModel: type "${type}" ==> REQUEST`);
                return NrRequest.parseValue(value);

            case NrObjectType.RESPONSE:
                nrLog.trace(`parseModel: type "${type}" ==> RESPONSE`);
                return NrResponse.parseValue(value);

            case NrObjectType.USER:
                nrLog.trace(`parseModel: type "${type}" ==> USER`);
                return NrRequest.parseValue(value);

            case NrObjectType.SESSION:
                nrLog.trace(`parseModel: type "${type}" ==> SESSION`);
                return NrSession.parseValue(value);

            case NrObjectType.CONFIRM_DIALOG:
                nrLog.trace(`parseModel: type "${type}" ==> CONFIRM_DIALOG`);
                return NrConfirmDialog.parseValue(value);

            case NrObjectType.FORM:
                nrLog.trace(`parseModel: type "${type}" ==> FORM`);
                return NrForm.parseValue(value);

            case NrObjectType.INFO_MESSAGE:
                nrLog.trace(`parseModel: type "${type}" ==> INFO_MESSAGE`);
                return NrInfoMessage.parseValue(value);

            case NrObjectType.PASSWORD_FIELD:
                nrLog.trace(`parseModel: type "${type}" ==> PASSWORD_FIELD`);
                return NrPasswordField.parseValue(value);

            case NrObjectType.TEXT_FIELD:
                nrLog.trace(`parseModel: type "${type}" ==> TEXT_FIELD`);
                return NrTextField.parseValue(value);

            default:
                throw new TypeError(`${this.nrName}.parseValue(): value's type is unsupported: "${value.type}"`);

        }

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
    static isInfoMessage (value) {
        return !!( value && value instanceof NrInfoMessage );
    }

}

// noinspection JSUnusedGlobalSymbols
export default NrModelUtils;
