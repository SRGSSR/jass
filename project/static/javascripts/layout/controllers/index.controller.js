(function () {
    'use strict';

    angular
        .module('jass.layout.controllers')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$scope', 'InputRequests', 'Snackbar'];

    function IndexController($scope, InputRequests, Snackbar) {
        var vm = this;
        vm.inputrequests = [];
        activate();

        function activate() {
            // do something on controller instanciation
        }
    }
})();

