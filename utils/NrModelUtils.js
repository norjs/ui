import NrObjectType from "../models/NrObjectType";
import NrResponse from "../models/NrResponse";
import NrRequest from "../models/NrRequest";
import NrSession from "../models/NrSession";
import NrConfirmDialog from "../models/views/NrConfirmDialog";
import NrInfoMessage from "../models/views/NrInfoMessage";
import NrForm from "../models/views/NrForm";
import NrTextField from "../models/views/fields/NrTextField";
import NrPasswordField from "../models/views/fields/NrPasswordField";

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

        if (!value) {
            throw new TypeError(`${this.nrName}.parseValue(): value was not defined: ${value}`);
        }

        if (!(value.type && _.isString(value.type))) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${value.type}"`);
        }

        const typeParts = value.type.split(":");
        const typeFirstPart = typeParts[0];

        switch (typeFirstPart) {

            case NrObjectType.REQUEST:
                return NrRequest.parseValue(value);

            case NrObjectType.RESPONSE:
                return NrResponse.parseValue(value);

            case NrObjectType.USER:
                return NrRequest.parseValue(value);

            case NrObjectType.SESSION:
                return NrSession.parseValue(value);

            case NrObjectType.CONFIRM_DIALOG:
                return NrConfirmDialog.parseValue(value);

            case NrObjectType.FORM:
                return NrForm.parseValue(value);

            case NrObjectType.INFO_MESSAGE:
                return NrInfoMessage.parseValue(value);

            case NrObjectType.PASSWORD_FIELD:
                return NrPasswordField.parseValue(value);

            case NrObjectType.TEXT_FIELD:
                return NrTextField.parseValue(value);

            default:
                throw new TypeError(`${this.nrName}.parseValue(): value's type is unsupported: "${value.type}"`);

        }

    }

}

// noinspection JSUnusedGlobalSymbols
export default NrModelUtils;
