(function () {
    'use strict';

    angular
        .module('jass.layout.controllers')
        .controller('RequestsController', RequestsController);

    RequestsController.$inject = ['$scope', '$location', 'InputRequests', 'RequestIcons', 'Snackbar'];


    hashCode = function(s){
      return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    }

    function RequestsController($scope, $location, InputRequests, RequestIcons, Snackbar) {
        var vm = this;

        $scope.inputrequests = [];
        $scope.is_paginated = false;
        $scope.number_of_pages = 0;
        $scope.range = new Array(100);

        activate();

        function activate() {
            $scope.viewLoading = true;
            if ($location.path() == "/streamsenseevents") {
                InputRequests.all("ns_st_sp=1").then(inputrequestsSuccessFn, inputrequestsErrorFn);
            }
            else {
                InputRequests.all().then(inputrequestsSuccessFn, inputrequestsErrorFn);
            }

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

                angular.forEach($scope.inputrequests, function(value) {
                    value.srg_test_hash = hashCode(value.request_arguments['srg_test']);
                    value.srg_test_hash_color = Math.abs(hashCode(value.srg_test_hash)) % 360;
                });

                var ws = new WebSocket('wss://'+$location.host()+'/ws/ws1?subscribe-broadcast&echo');
                ws.onopen = function() {
                    console.log("websocket connected");
                };
                ws.onmessage = function(e) {
                    console.log("Received: " + e.data);
                    if (e.data !== "--heartbeat--") {
                        var newrequest = JSON.parse(e.data);
                        parseRequestURLArguments(newrequest);
                        $scope.inputrequests.unshift(newrequest);
                        $scope.$apply();
                    }
                };
                ws.onerror = function(e) {
                    console.error(e);
                };
                ws.onclose = function(e) {
                    setTimeout(ws, 1000);
                    console.log("connection closed, attempting to set timeout to reopen");
                };

                for (var i = 0; i < $scope.inputrequests.length; i++) {
                    parseRequestURLArguments($scope.inputrequests[i]);
                }
            }

            function inputrequestsErrorFn(data, status, headers, config) {
                $scope.viewLoading = false;
                Snackbar.error(data.error);
                console.log(data.error);
            }

            function parseRequestURLArguments(req) {
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

