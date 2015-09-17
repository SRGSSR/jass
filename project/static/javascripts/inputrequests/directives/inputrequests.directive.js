(function () {
    'use strict';

    angular
        .module('jass.inputrequests.directives')
        .directive('inputrequests', inputrequests);

    function inputrequests() {
        var directive = {
            controller: 'InputRequestsController',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                inputrequests: '='
            },
            templateUrl: '/static/templates/inputrequests/inputrequests.html'
        };

        return directive;
    }
})();

