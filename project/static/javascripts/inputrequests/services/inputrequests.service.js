(function () {
    'use strict';

    angular
        .module('jass.inputrequests.services')
        .factory('InputRequests', InputRequests);

    InputRequests.$inject = ['$http'];

    function InputRequests($http) {
        var InputRequests = {
            all: all,
            create: create,
            get: get

        };

        return InputRequests;

        function all(params) {
            var url =  '/api/inputrequests/';
            if (params !== undefined) {
                url += "?"+params;
            }
            return $http.get(url);
        }

        function create(content) {
            return $http.post('/api/inputrequests/', {
                content: content
            });
        }

        function get(pk) {
            return $http.get('/api/inputrequests/' + pk);
        }
    }
})();

