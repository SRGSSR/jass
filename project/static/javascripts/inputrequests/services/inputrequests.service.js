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

        function all(options) {
            var url =  '/api/inputrequests/';
            var params = options || {};
            return $http.get(url, {params: params});
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

