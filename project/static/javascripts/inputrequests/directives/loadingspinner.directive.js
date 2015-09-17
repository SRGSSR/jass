(function () {
    'use strict';

    angular
        .module('jass.inputrequests.directives')
        .directive('loadingspinner', loadingspinner);

    function loadingspinner() {
        var directive = {
            restrict: 'A',
            replace: true,
            transclude: true,
            scope: {
                loading: '=loadingspinner'
            },
            templateUrl: 'directives/templates/loading.html',
            link: function(scope, element, attrs) {
                var spinner = new Spinner().spin();
                var loadingContainer = element.find('.loading-spinner-container')[0];
                loadingContainer.appendChild(spinner.el);
            }
        };
    }
})();

