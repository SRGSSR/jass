(function () {
    'use strict';

    angular
        .module('jass.layout.controllers')
        .controller('RequestsController', RequestsController);

    RequestsController.$inject = ['$scope', 'InputRequests', 'RequestIcons', 'Snackbar'];

    function RequestsController($scope, InputRequests, RequestIcons, Snackbar) {
        var vm = this;

        $scope.inputrequests = [];
        $scope.is_paginated = false;
        $scope.number_of_pages = 0;
        $scope.range = new Array(100);

        activate();

        function activate() {
            $scope.viewLoading = true;
            InputRequests.all().then(inputrequestsSuccessFn, inputrequestsErrorFn);

            function inputrequestsSuccessFn(response, status, headers, config) {
                $scope.viewLoading = false;

                var json_data = response.data;
                if (json_data.results !== undefined && json_data.count !== undefined) { // paginated data
                    $scope.is_paginated = true;
                    $scope.number_of_pages = json_data.count / json_data.results.length;
                    $scope.inputrequests = json_data.results;
                }
                else {
                    $scope.is_paginated = false;
                    $scope.number_of_pages = 0;
                    $scope.inputrequests = json_data;
                }

                var ws = new WebSocket('ws://127.0.0.1:8000/ws/ws1?subscribe-broadcast&echo');
                ws.onopen = function() {
                    console.log("websocket connected");
                };
                ws.onmessage = function(e) {
                    console.log("Received: " + e.data);
                    var newrequest = JSON.parse(e.data);
                    parseRequestHeaders(newrequest);
                    $scope.inputrequests.unshift(newrequest);
                    $scope.$apply();
                };
                ws.onerror = function(e) {
                    console.error(e);
                };
                ws.onclose = function(e) {
                    console.log("connection closed");
                };

                for (var i = 0; i < $scope.inputrequests.length; i++) {
                    parseRequestHeaders($scope.inputrequests[i]);
                }
            }

            function inputrequestsErrorFn(data, status, headers, config) {
                $scope.viewLoading = false;
                Snackbar.error(data.error);
                console.log(data.error);
            }

            function parseRequestHeaders(req) {
                var parser = document.createElement('a');
                parser.href = req.url;
                var tmp_arguments = parser.search.split('&');
                req.request_arguments = {};

                for (var j = 0; j < tmp_arguments.length; j++) {
                    var arg = tmp_arguments[j].split('=');
                    if (arg[0][0] === "?") {
                        arg[0] = arg[0].substring(1);
                    }
                    req.request_arguments[arg[0]] = arg[1];
                }
                RequestIcons.findAll(req);
            }
        }
    }
})();

