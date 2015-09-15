/**
 * Posts
 * @namespace jass.inputrequests.services
 */
(function () {
    'use strict';

    angular
        .module('jass.inputrequests.services')
        .factory('InputRequests', InputRequests);

    InputRequests.$inject = ['$http'];

    /**
     * @namespace InputRequests
     * @returns {Factory}
     */
    function InputRequests($http) {
        var InputRequests = {
            all: all,
            create: create,
            get: get

        };

        return InputRequests;

        ////////////////////

        /**
         * @name all
         * @desc Get all InputRequests
         * @returns {Promise}
         * @memberOf jass.inputrequests.services.InputRequests
         */
        function all(method, hostname) {
            var url =  '/api/inputrequests/';
            if (method !== undefined || hostname !== undefined) {
                url += "?";
                if (method !== undefined) {
                    url += 'method='+method;
                    if (hostname !== undefined) {
                        url += '&';
                    }
                }
                if (hostname !== undefined) {
                    url += 'hostname='+hostname;
                }
            }
            return $http.get(url);
        }


        /**
         * @name create
         * @desc Create a new InputRequests
         * @param {string} content The content of the new InputRequests
         * @returns {Promise}
         * @memberOf jass.inputrequests.services.InputRequests
         */
        function create(content) {
            return $http.post('/api/inputrequests/', {
                content: content
            });
        }

        /**
         * @name get
         * @desc Get the InputRequests
         * @returns {Promise}
         * @memberOf jass.inputrequests.services.InputRequests
         */
        function get(pk) {
            return $http.get('/api/inputrequests/' + pk);
        }
    }
})();

