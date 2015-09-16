(function () {
    'use strict';

    angular
        .module('jass.layout.controllers')
        .controller('ComparisonsController', ComparisonsController);

    ComparisonsController.$inject = ['$scope', '$routeParams', 'InputRequests', 'Snackbar'];

    function ComparisonsController($scope, $routeParams, InputRequests, Snackbar) {
        var vm = this;

        vm.inputrequests = [];

        activate();

        function activate() {
            var media_id = $routeParams.media_id;
            InputRequests.all('srg_pr_id='+media_id).then(inputrequestsSuccessFn, inputrequestsErrorFn);

            function inputrequestsSuccessFn(data, status, headers, config) {
                vm.inputrequests = data.data;

                //for (var i = 0; i < vm.inputrequests.length; i++) {
                //    var inputrequest = vm.inputrequests[i];
                //    (function(req) {
                //        var parser = document.createElement('a');
                //        parser.href = req.url;
                //        var tmp_arguments = parser.search.split('&');
                //        req.request_arguments = [];
                //        for (var j = 0; j < tmp_arguments.length; j++) {
                //            var arg = tmp_arguments[j].split('=');
                //            if (arg[0][0] === "?") {
                //                arg[0] = arg[0].substring(1);
                //            }
                //            req.request_arguments.push({'key': arg[0], 'value': arg[1]});
                //        }
                //    })(inputrequest);
                //}
            }

            function inputrequestsErrorFn(data, status, headers, config) {
                Snackbar.error(data.error);
                console.log(data.error);
            }
        }
    }
})();

