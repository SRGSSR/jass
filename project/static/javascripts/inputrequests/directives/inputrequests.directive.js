/**
 * Posts
 * @namespace jass.inputrequests.directives
 */
(function () {
    'use strict';

    angular
        .module('jass.inputrequests.directives')
        .directive('inputrequests', inputrequests);

    /**
     * @namespace Input Requests
     */
    function inputrequests() {
        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf jass.inputrequests.directives.InputRequests
         */
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

