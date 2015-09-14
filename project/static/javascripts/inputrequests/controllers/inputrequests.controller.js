/**
 * PostsController
 * @namespace jass.inputrequests.controllers
 */
(function () {
    'use strict';

    angular
        .module('jass.inputrequests.controllers')
        .controller('InputRequestsController', InputRequestsController);

    InputRequestsController.$inject = ['$scope'];

    /**
     * @namespace InputRequestsController
     */
    function InputRequestsController($scope) {
        var vm = this;
        vm.columns = [];
        activate();

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf jass.inputrequests.controllers.InputRequestsController
         */
        function activate() {
            $scope.$watchCollection(function () { return $scope.inputrequests; }, render);
        }

        /**
         * @name render
         * @desc Renders InputRequests into items
         * @param {Array} current The current value of `vm.inputrequests`
         * @param {Array} original The value of `vm.inputrequests` before it was updated
         * @memberOf jass.inputrequests.controllers.InputRequestsController
         */
        function render(current, original) {
            if (current !== original) {
                vm.columns = [];
                vm.columns.push([]);
                for (var i = 0; i < current.length; ++i) {
                    vm.columns[0].push(current[i]);
                }
            }
        }
    }
})();

