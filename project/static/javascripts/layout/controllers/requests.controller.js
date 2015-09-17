(function () {
    'use strict';

    angular
        .module('jass.layout.controllers')
        .controller('RequestsController', RequestsController);

    RequestsController.$inject = ['$scope', 'InputRequests', 'Snackbar'];

    function RequestsController($scope, InputRequests, Snackbar) {
        var vm = this;

        vm.inputrequests = [];
        vm.is_paginated = false;
        vm.number_of_pages = 0;
        vm.range = new Array(100);

        activate();

        function activate() {
            $scope.viewLoading = true;
            InputRequests.all().then(inputrequestsSuccessFn, inputrequestsErrorFn);

            function inputrequestsSuccessFn(data, status, headers, config) {
                $scope.viewLoading = false;

                var json_data = data.data;
                if (json_data.results !== undefined && json_data.count !== undefined) { // paginated data
                    vm.is_paginated = true;
                    vm.number_of_pages = json_data.count / json_data.results.length;
                    vm.inputrequests = json_data.results;
                }
                else {
                    vm.is_paginated = false;
                    vm.number_of_pages = 0;
                    vm.inputrequests = json_data;
                }

                for (var i = 0; i < vm.inputrequests.length; i++) {
                    var inputrequest = vm.inputrequests[i];
                    (function(req) {
                        var parser = document.createElement('a');
                        parser.href = req.url;
                        var tmp_arguments = parser.search.split('&');
                        req.request_arguments = [];
                        for (var j = 0; j < tmp_arguments.length; j++) {
                            var arg = tmp_arguments[j].split('=');
                            if (arg[0][0] === "?") {
                                arg[0] = arg[0].substring(1);
                            }
                            req.request_arguments.push({'key': arg[0], 'value': arg[1]});
                        }
                    })(inputrequest);
                }
            }

            function inputrequestsErrorFn(data, status, headers, config) {
                $scope.viewLoading = false;
                Snackbar.error(data.error);
                console.log(data.error);
            }
        }
    }
})();

