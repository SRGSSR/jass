(function () {
    'use strict';

    angular
        .module('jass.inputrequests.controllers')
        .controller('InputRequestsController', InputRequestsController);

    InputRequestsController.$inject = ['$scope'];

    function InputRequestsController($scope) {
        var vm = this;
        vm.columns = [];
        activate();

        function activate() {
            $scope.$watchCollection(function () { return $scope.inputrequests; }, render);
        }

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

