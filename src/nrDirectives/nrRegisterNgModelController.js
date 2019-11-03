import NgAttribute from "../NgAttribute";
import NrDirectiveName from "../NrDirectiveName";
import LogUtils from "@norjs/utils/Log";
import NrTag from "../NrTag";

// noinspection JSUnusedLocalSymbols
const nrLog = LogUtils.getLogger("NrRegisterNgModelControllerDirective");

/**
 *
 */
class NrRegisterNgModelControllerDirective {

    /**
     *
     * @returns {string}
     */
    static get nrName () {
        return "NrRegisterNgModelControllerDirective";
    }

    /**
     *
     * @returns {string}
     */
    get nrName () {
        return this.Class.nrName;
    }

    /**
     *
     * @returns {typeof NrRegisterNgModelControllerDirective}
     */
    get Class () {
        return NrRegisterNgModelControllerDirective;
    }

    /**
     *
     * @param $parse {angular.IParseService}
     * @ngInject
     */
    constructor ($parse) {

        /**
         *
         * @member {angular.IParseService}
         * @private
         */
        this._$parse = $parse;

        this._scope = true;
        this._restrict = 'A';
        this._require = `${NgAttribute.MODEL}`;

    }

    /**
     *
     * @returns {*}
     */
    get scope () {

        return this._scope;

    }

    /**
     * AngularJS uses this.
     *
     * @param value {*}
     */
    set scope (value) {

        this._scope = value;

    }

    /**
     *
     * @returns {*}
     */
    get restrict () {

        return this._restrict;

    }

    /**
     * AngularJS uses this.
     *
     * @param value {*}
     */
    set restrict (value) {

        this._restrict = value;

    }

    /**
     *
     * @returns {*}
     */
    get require () {

        return this._require;

    }

    /**
     * AngularJS uses this.
     *
     * @param value {*}
     */
    set require (value) {

        this._require = value;

    }

    /**
     *
     * @param scope {angular.IScope}
     * @param element {JQLite}
     * @param attrs {angular.IAttributes}
     * @param ngModelController {angular.INgModelController}
     * @returns {*}
     */
    link (scope, element, attrs, ngModelController) {

        const expression = attrs[NrDirectiveName.REGISTER_NG_MODEL_CONTROLLER];

        if (!expression) throw new TypeError(`No attribute ${NrDirectiveName.REGISTER_NG_MODEL_CONTROLLER}`);

        const expressionFn = this._$parse( expression );

        expressionFn(scope,{ngModelController});

        nrLog.trace(`Called expression "${expression}" to register ngModelController as `, ngModelController);

    }

}

/**
 *
 * @param $parse {angular.IParseService}
 * @ngInject
 */
export function nrRegisterNgModel ($parse) {
    return new NrRegisterNgModelControllerDirective($parse);
}

export default nrRegisterNgModel;
