(function () {
    'use strict';

    angular
        .module('jass.layout.controllers')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$scope', 'InputRequests'];

    function IndexController($scope, InputRequests) {
        var vm = this;

        $scope.compareRequests = function(sender) {
            var val = angular.element("#mediaid-input").val();
            if (val === undefined || val.length == 0) {
                alert("A media ID is required to proceeed.");
            }
            else {
                window.location = "/comparisons/"+val+"/play";
            }
        };

        $scope.seeLatestRequests = function(bu) {
            window.location = "/inputrequests/" + bu;
        };
    }

})();

