import LogUtils from "@norjs/utils/Log";

const nrLog = LogUtils.getLogger("NrRequestService");

const PRIVATE = {

};

export class NrRequestService {

    static get nrName () {
        return "NrRequestService";
    }

    get Class () {
        return NrRequestService;
    }

    get nrName () {
        return this.Class.nrName;
    }

    /**
     *
     * @param $http {angular.IHttpService}
     * @ngInject
     */
    constructor (
        $http
    ) {

        /**
         *
         * @member {angular.IHttpService}
         */
        this[PRIVATE.http] = $http;

    }

    /**
     *
     * @param request {NrRequest}
     * @returns {angular.IPromise}
     */
    executeRequest (request) {
        return this[PRIVATE.http]({
            method: request.method,
            data: request.payload,
            url: request.href
        }).then(
            (response) => response ? response.data : response
        ).catch(err => {
            nrLog.error(`${this.nrName}: Error: `, err);
        });
    }

}

// noinspection JSUnusedGlobalSymbols
export default NrRequestService;
