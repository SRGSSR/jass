(function () {
    'use strict';

    angular
        .module('jass.inputrequests.directives')
        .directive('inputrequest', inputrequest);

    function inputrequest() {
        var directive = {
            restrict: 'E',
            scope: {
                inputrequest: '='
            },
            templateUrl: '/static/templates/inputrequests/inputrequest.html',
            link: function(scope, element, attrs) {
                angular.element('.btn-details').on('click', function(e) {
                    e.preventDefault();
                    var $this = $(this);
                    var $collapse = $this.closest('.collapse-group').find('.collapse');
                    $collapse.collapse('toggle');
                })
            }
        };

        return directive;
    }
})();
