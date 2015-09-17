(function () {
    'use strict';

    angular
        .module('jass.layout.controllers')
        .controller('ComparisonsController', ComparisonsController);

    ComparisonsController.$inject = ['$scope', '$routeParams', 'InputRequests', 'Snackbar'];

    function ComparisonsController($scope, $routeParams, InputRequests, Snackbar) {
        var vm = this;

        vm.comparisontable = undefined;

        activate();

        function activate() {
            $scope.viewLoading = true;

            vm.comparisontable = {};
            vm.comparisontable.media_id = $routeParams.media_id;

            InputRequests.all('srg_pr_id='+vm.comparisontable.media_id).then(successFn, errorFn);

            function successFn(data, status, headers, config) {
                $scope.viewLoading = false;

                vm.comparisontable.requests = data.data;
                vm.comparisontable.table_rows = [];

                // First decompose all url arguments and fill a set of keys...
                // URL arguments are put into a request_arguments object.
                var keys = [];
                for (var i = 0; i < vm.comparisontable.requests.length; i++) {
                    var request = vm.comparisontable.requests[i];

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
                    })(request, keys);
                }

                var filtered_keys = keys.filter(function(elem, index, self) {
                    return index == self.indexOf(elem);
                }).sort();

                for (var j = 0; j < filtered_keys.length; j++) {
                    var key = filtered_keys[j];
                    var row = [];
                    row.push(key);
                    for (var k = 0; k < vm.comparisontable.requests.length; k++) {
                        var req = vm.comparisontable.requests[k];
                        if (req.request_arguments[key] != undefined) {
                            row.push(req.request_arguments[key]);
                        }
                        else {
                            row.push('missing');
                        }
                    }

                    vm.comparisontable.table_rows.push(row);
                }
            }

            function errorFn(data, status, headers, config) {
                $scope.viewLoading = false;
                Snackbar.error(data.error);
                console.log(data.error);
            }
        }
    }
})();

