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
            var url = "/inputrequests/" ;
            if (bu !== undefined) {
                url += "?bu="+bu;
            }
            window.location = url;
        };

        $scope.seeLatestEvents = function() {
            var url = "/events?sf=ns_ap_device,ns_st_ev,ns_st_ep,ns_st_ci,ns_st_po,ns_st_pn,ns_st_tp,ns_st_cn,ns_st_el,ns_st_cl,ns_st_sl&cf=ns_ap_device,ns_vsite,srg_title";
            window.location = url;
        }
    }

})();

