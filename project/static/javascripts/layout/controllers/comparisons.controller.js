(function () {
    'use strict';

    angular
        .module('jass.layout.controllers')
        .controller('ComparisonsController', ComparisonsController);

    ComparisonsController.$inject = ['$scope', '$routeParams', 'InputRequests', 'RequestIcons', 'Snackbar'];

    function ComparisonsController($scope, $routeParams, InputRequests, RequestIcons, Snackbar) {
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
                vm.comparisontable.rows = [];

                // First decompose all url arguments and fill a set of keys...
                // URL arguments are put into a request_arguments object.
                var keys = [];
                for (var i = 0; i < vm.comparisontable.requests.length; i++) {
                    var inputrequest = vm.comparisontable.requests[i];

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

                for (var j = 0; j < filtered_keys.length; j++) {
                    var key = filtered_keys[j];
                    var row = [];
                    var key_cell = {'content': key, 'validation': 'unknown'};
                    row.push(key_cell);

                    var row_items = [];
                    for (var k = 0; k < vm.comparisontable.requests.length; k++) {
                        var cell = {};
                        var req = vm.comparisontable.requests[k];
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

                    vm.comparisontable.rows.push(row);
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

