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
        function all() {
            return $http.get('/api/inputrequests/');
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

