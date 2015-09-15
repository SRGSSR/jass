/**
 * IndexController
 * @namespace jass.layout.controllers
 */
(function () {
    'use strict';

    angular
        .module('jass.layout.controllers')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$scope', 'InputRequests', 'Snackbar'];

    /**
     * @namespace IndexController
     */
    function IndexController($scope, InputRequests, Snackbar) {
        var vm = this;

        //vm.isAuthenticated = Authentication.isAuthenticated();
        vm.inputrequests = [];

        activate();

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf jass.layout.controllers.IndexController
         */
        function activate() {
            InputRequests.all('GET', 'b.scorecardresearch.com').then(inputrequestsSuccessFn, inputrequestsErrorFn);

            //$scope.$on('inputrequest.created', function (event, post) {
            //    vm.inputrequests.unshift(post);
            //});
            //
            //$scope.$on('inputrequest.created.error', function () {
            //    vm.inputrequests.shift();
            //});


            /**
             * @name inputrequestsSuccessFn
             * @desc Update inputrequests array on view
             */
            function inputrequestsSuccessFn(data, status, headers, config) {
                vm.inputrequests = data.data;

                for (var i = 0; i < vm.inputrequests.length; i++) {
                    var inputrequest = vm.inputrequests[i];
                    if (inputrequest.url.indexOf('b.scorecardresearch.com') > -1) {
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
            }


            /**
             * @name inputrequestsErrorFn
             * @desc Show snackbar with error
             */
            function inputrequestsErrorFn(data, status, headers, config) {
                Snackbar.error(data.error);
                console.log(data.error);
            }
        }
    }
})();

