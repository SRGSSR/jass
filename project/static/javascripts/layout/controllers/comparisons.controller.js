(function () {
    'use strict';

    angular
        .module('jass.layout.controllers')
        .controller('ComparisonsController', ComparisonsController);

    ComparisonsController.$inject = ['$scope', '$location', '$routeParams', 'InputRequests', 'RequestIcons', 'Snackbar'];

    function ComparisonsController($scope, $location, $routeParams, InputRequests, RequestIcons, Snackbar) {
        var vm = this;
        vm.table = {};
        vm.requests = [];
        vm.selected_requests = [];

        $scope.searchString = "";
        $scope.viewLoading = false;

        $scope.selectRequest = function(request) {
            var index = vm.selected_requests.indexOf(request);
            if (index != -1) {
                vm.selected_requests.splice(index, 1);
            }
            else {
                vm.selected_requests.push(request);
            }

            $scope.reloadTableRows(vm.selected_requests);
        };

        $scope.removeSelectedRequest = function(request) {
            var index = vm.selected_requests.indexOf(request);
            if (index != -1) {
                vm.selected_requests.splice(index, 1);
            }
            $scope.reloadTableRows(vm.selected_requests);
        };

        $scope.panelClassForRequest = function(request) {
            var selected_ids = vm.selected_requests.map(function(obj) {
                return obj.id;
            });

            if (selected_ids.indexOf(request.id) != -1) {
                return "panel-selected";
            }
            return "";
        };

        if ($routeParams.query !== undefined) {
            $scope.searchString = $routeParams.query+" ";
        }

        $scope.reloadTableRows = function(requests) {
            vm.table.rows = [];

            for (var j = 0; j < vm.table.keys.length; j++) {
                var key = vm.table.keys[j];
                var row = [];
                var key_cell = {'content': key, 'validation': 'unknown'};
                row.push(key_cell);

                var row_items = [];
                for (var k = 0; k < requests.length; k++) {
                    var cell = {};
                    var req = requests[k];
                    if (req.request_arguments[key] != undefined) {
                        cell['content'] = req.request_arguments[key];
                    }
                    else {
                        cell['content'] = 'missing';
                    }
                    row_items.push(cell['content']);
                    row.push(cell);
                }

                var filtered_row_items = row_items.filter(function(elem, index, self) {
                    return index == self.indexOf(elem);
                });

                if (filtered_row_items.length == 1) {
                    key_cell['validation'] = "ok";
                }
                else {
                    key_cell['validation'] = "different";
                }

                vm.table.rows.push(row);
            }
        };

        activate();

        function activate() {
            $scope.$watch(function() {
                return $scope.searchString;
            }, function(newValue, oldValue, scope) {
                if (newValue.length < 2) {
                    $scope.viewLoading = false;
                    vm.requests = [];
                }
                else {
                    $scope.viewLoading = true;
                    InputRequests.all({"ns_st_ev": $routeParams.event, "url": newValue}).then(successFn, errorFn);
                }
            });

            function successFn(data, status, headers, config) {
                $scope.viewLoading = false;

                // Handling pagination of the data.
                if (data.data.results !== undefined && data.data.count !== undefined) {
                    vm.requests = decomposeRequestsArguments(data.data.results);
                }
                else {
                    vm.requests = decomposeRequestsArguments(data.data);
                }

                var ws = new WebSocket('wss://'+$location.host()+'/ws/ws1?subscribe-broadcast&echo');
                ws.onopen = function() {
                    console.log("websocket connected");
                };
                ws.onmessage = function(e) {
                    console.log("Received: " + e);
                    if (e.data !== "--heartbeat--") {
                        handleMessage(e.data);
                    }
                };
                ws.onerror = function(e) {
                    console.error(e);
                };
                ws.onclose = function(e) {
                    setTimeout(ws, 1000);
                    console.log("connection closed, attempting to set timeout to reopen");
                };
            }

            function handleMessage(data) {
                var newrequest = JSON.parse(data);
                decomposeRequestArguments(newrequest, []);
                if (newrequest.url.indexOf($scope.searchString) != -1
                 && vm.requests.reduce(function(v, cV, cI, a) {
                    if (v == 1) {
                        if (cV.id == newrequest.id) {
                            v = 0;
                        }
                    }
                    return v;
                }, 1)) {
                    vm.requests.unshift(newrequest);
                    $scope.$apply();
                }
            }

            function errorFn(data, status, headers, config) {
                $scope.viewLoading = false;
                Snackbar.error(data.error);
                console.log(data.error);
            }

            function decomposeRequestsArguments(requests) {
                // First decompose all url arguments and fill a set of keys...
                // URL arguments are put into a request_arguments object.
                var keys = [];
                for (var i = 0; i < requests.length; i++) {
                    var inputrequest = requests[i];

                    decomposeRequestArguments(inputrequest, keys);
                }

                vm.table.keys = keys.filter(function(elem, index, self) {
                    return index == self.indexOf(elem);
                }).sort();

                return requests;
            }

            function decomposeRequestArguments(req, ks) {
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
                    ks.push(arg[0]);
                }
                RequestIcons.findAll(req);
            }
        }
    }
})();

