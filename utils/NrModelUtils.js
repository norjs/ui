import NrObjectType from "../models/NrObjectType";
import NrResponse from "../models/NrResponse";

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

        if (!value.type) {
            throw new TypeError(`${this.nrName}.parseValue(): value's type is not correct: "${value.type}"`);
        }

        const typeParts = value.type.split(":");
        const typeFirstPart = typeParts[0];
        const typeSecondPart = typeParts[1];

        switch (typeFirstPart) {
            case NrObjectType.REQUEST:
                return NrRequest.parseValue(value);
            case NrObjectType.RESPONSE:
                return NrResponse.parseValue(value);
            case NrObjectType.CONFIRM_DIALOG:
                return NrConfirmDialog.parseValue(value);
        }
    }

}

// noinspection JSUnusedGlobalSymbols
export default NrModelUtils;
