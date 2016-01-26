(function () {
    'use strict';

    angular
        .module('jass.layout.controllers')
        .controller('InputRequestsController', InputRequestsController);

    InputRequestsController.$inject = ['$scope', '$location', '$routeParams', 'InputRequests', 'RequestIcons', 'Snackbar'];

    var hashCode = function(s){
        if (s === undefined || s.length == 0 || !((typeof s) === 'string')) {
            return 0;
        }
        return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    };

    function InputRequestsController($scope, $location, $routeParams, InputRequests, RequestIcons, Snackbar) {
        var vm = this;

        vm.bu = "All";
        if ($routeParams.bu !== undefined) {
            vm.bu = $routeParams.bu;
        }

        $scope.inputrequests = [];
        $scope.is_paginated = false;
        $scope.number_of_pages = 0;
        $scope.range = new Array(100);

        $scope.getRequestArgument = function(row, name) {
            console.log("getRequestArgument(" + name);
            return $scope.data_row.request_arguments[name];
        };

        activate();

        function activate() {
            $scope.viewLoading = true;
            InputRequests.all($routeParams.bu).then(inputrequestsSuccessFn, inputrequestsErrorFn);

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
                req.request_arguments_count = 0;

                if (typeof req.url != "undefined" && req.url !== null) {
                    if (req.url.indexOf("il.srgssr.ch/integrationlayer") >= 1) {
                        req.request_type = "il";
                    } else {
                        req.request_type = "comscore";
                    }
                }

                for (var j = 0; j < tmp_arguments.length; j++) {
                    var arg = tmp_arguments[j].split('=');
                    if (arg[0][0] === "?") {
                        arg[0] = arg[0].substring(1);
                    }
                    if (arg[0] == "ns_st_sp" && arg[1] == "1") {
                        req.request_type = "streamsense";
                    }
                    req.request_arguments[arg[0]] = arg[1];
                }


                req.srg_test_hash = hashCode(req.request_arguments['srg_test']);
                if (req.request_type=="il") {
                    req.srg_test_hash_color = 100;
                } else if (req.request_type=="streamsense") {
                    req.srg_test_hash_color = 200;
                } else if (req.request_type=="comscore") {
                    req.srg_test_hash_color = 50;
                }

                RequestIcons.findAll(req);
            }
        }
    }
})();

