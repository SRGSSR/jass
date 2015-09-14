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
            InputRequests.all().then(inputrequestsSuccessFn, inputrequestsErrorFn);

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

