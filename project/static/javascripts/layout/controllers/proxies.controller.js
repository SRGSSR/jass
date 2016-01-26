(function () {
    'use strict';

    angular
        .module('jass.layout.controllers')
        .controller('ProxiesController', ProxiesController);

//    angular
//        .module('jass.layout.controllers', [ 'yaru22.angular-timeago' ]);

    ProxiesController.$inject = ['$scope', '$http'];

    function ProxiesController($scope, $http) {
        var vm = this;
        $http.get( '/api/proxies/' ).success( function ( data ) {
                $scope.proxyList = data;
        });
    }
})();

