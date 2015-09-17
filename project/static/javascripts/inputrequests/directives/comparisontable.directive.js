(function () {
    'use strict';

    angular
        .module('jass.inputrequests.directives')
        .directive('comparisontable', comparisontable);

    function comparisontable() {
        var directive = {
            controller: 'ComparisonTableController',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                comparisontable: '='
            },
            templateUrl: '/static/templates/inputrequests/comparisontable.html'
        };

        return directive;
    }
})();
