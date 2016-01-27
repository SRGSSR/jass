(function () {
    'use strict';

    angular
        .module('jass.inputrequests.directives')
        .directive('smallinputrequest', smallinputrequest);

    function smallinputrequest() {
        var directive = {
            restrict: 'E',
            scope: {
                smallinputrequest: '='
            },
            templateUrl: '/static/templates/inputrequests/smallinputrequest.html'
        };

        return directive;
    }
})();
