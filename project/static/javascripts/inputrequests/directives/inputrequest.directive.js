/**
 * InputRequest
 * @namespace jass.inputrequests.directives
 */
(function () {
    'use strict';

    angular
        .module('jass.inputrequests.directives')
        .directive('inputrequest', inputrequest);

    /**
     * @namespace InputRequest
     */
    function inputrequest() {
        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf jass.inputrequests.directives.InputRequest
         */
        var directive = {
            restrict: 'E',
            scope: {
                inputrequest: '='
            },
            templateUrl: '/static/templates/inputrequests/inputrequest.html'
        };

        return directive;
    }
})();
