(function () {
    'use strict';

    angular
        .module('jass.layout.controllers')
        .controller('StatusController', StatusController);

    angular
        .module('jass.layout.controllers', [ 'yaru22.angular-timeago' ]);

    StatusController.$inject = ['$scope', '$http'];

    function StatusController($scope, $http) {
        var vm = this;
        $http.get( '/api/proxies/' ).success( function ( data ) {
                $scope.proxyList = data;
        });
    }
})();

