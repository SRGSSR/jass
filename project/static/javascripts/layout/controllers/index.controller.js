(function () {
    'use strict';

    angular
        .module('jass.layout.controllers')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$scope', 'InputRequests'];

    function IndexController($scope, InputRequests) {
        var vm = this;

        $scope.compareRequests = function(sender) {
            window.location = "/comparisons?query=ns_st_ev%3Dplay";
        };

        $scope.seeLatestRequests = function(bu) {
            var url = "/inputrequests/" ;
            if (bu !== undefined) {
                url += "?bu="+bu;
            }
            window.location = url;
        };

        $scope.seeLatestEvents = function() {
            window.location = "/events?sf=ns_ap_device,ns_st_ev,ns_st_ep,ns_st_ci,ns_st_po,ns_st_pn,ns_st_tp,ns_st_cn,ns_st_el,ns_st_cl,ns_st_sl&cf=ns_ap_device,ns_vsite,srg_title";
        }
    }

})();

