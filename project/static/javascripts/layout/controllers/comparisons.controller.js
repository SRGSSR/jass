(function () {
    'use strict';

    angular
        .module('jass.layout.controllers')
        .controller('ComparisonsController', ComparisonsController);

    ComparisonsController.$inject = ['$scope', '$routeParams', 'InputRequests', 'RequestIcons', 'Snackbar'];

    function ComparisonsController($scope, $routeParams, InputRequests, RequestIcons, Snackbar) {
        var vm = this;
        vm.table = undefined;

        if ($routeParams.event === undefined) {
            $scope.viewLoading = false;
            Snackbar.error("Missing event");
            console.log("Missing event");
        }
        else {
            activate();
        }

        function activate() {
            $scope.viewLoading = true;
            $scope.searchString = "";

            vm.table = {};
            vm.table.event = $routeParams.event;

            InputRequests.all({"ns_st_ev": $routeParams.event}).then(successFn, errorFn);

            function successFn(data, status, headers, config) {
                $scope.viewLoading = false;
                vm.table.all_requests = [];
                vm.table.filtered_requests = [];
                vm.table.rows = [];

                // Handling pagination of the data.
                if (data.data.results !== undefined && data.data.count !== undefined) {
                    vm.table.all_requests = data.data.results;
                }
                else {
                    vm.table.all_requests = data.data;
                }

                if (vm.table.all_requests.length > 1) {
                    decomposeRequestsArguments();
                    filterRequests($scope.searchString || "");

                    $scope.$watch(function() {
                        return $scope.searchString;
                    }, function(newValue, oldValue, scope) {
                        filterRequests(newValue);
                    });

                    //for (var j = 0; j < filtered_keys.length; j++) {
                    //    var key = filtered_keys[j];
                    //    var row = [];
                    //    var key_cell = {'content': key, 'validation': 'unknown'};
                    //    row.push(key_cell);
                    //
                    //    var row_items = [];
                    //    for (var k = 0; k < vm.table.requests.length; k++) {
                    //        var cell = {};
                    //        var req = vm.table.requests[k];
                    //        if (req.request_arguments[key] != undefined) {
                    //            cell['content'] = req.request_arguments[key];
                    //        }
                    //        else {
                    //            cell['content'] = 'missing';
                    //        }
                    //        row_items.push(cell['content']);
                    //        row.push(cell);
                    //    }
                    //
                    //    var filtered_row_items = row_items.filter(function(elem, index, self) {
                    //        return index == self.indexOf(elem);
                    //    });
                    //
                    //    if (filtered_row_items.length == 1) {
                    //        key_cell['validation'] = "ok";
                    //    }
                    //    else {
                    //        key_cell['validation'] = "different";
                    //    }
                    //
                    //    vm.table.rows.push(row);
                    //}
                }
            }

            function errorFn(data, status, headers, config) {
                $scope.viewLoading = false;
                Snackbar.error(data.error);
                console.log(data.error);
            }

            function decomposeRequestsArguments() {
                // First decompose all url arguments and fill a set of keys...
                // URL arguments are put into a request_arguments object.
                var keys = [];
                for (var i = 0; i < vm.table.all_requests.length; i++) {
                    var inputrequest = vm.table.all_requests[i];

                    (function(req, ks) {
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
                    })(inputrequest, keys);
                }

                var filtered_keys = keys.filter(function(elem, index, self) {
                    return index == self.indexOf(elem);
                }).sort();

                vm.table.keys = filtered_keys;
            }

            function filterRequests(searchString) {

            }
        }
    }
})();

