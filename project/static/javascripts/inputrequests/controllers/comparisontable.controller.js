(function () {
    'use strict';

    angular
        .module('jass.inputrequests.controllers')
        .controller('ComparisonTableController', ComparisonTableController);

    ComparisonTableController.$inject = ['$scope'];

    function ComparisonTableController($scope) {
        var vm = this;
        vm.table = [];
        activate();

        function activate() {
            $scope.$watchCollection(function () { return $scope.comparisontable; }, render);
            //$scope.$watchCollection(function () { return $scope.table_rows; }, render);
        }

        function render(current, original) {
            if (current !== original) {
                vm.table = $scope.comparisontable;
            }
        }
    }
})();

