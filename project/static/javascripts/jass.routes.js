(function () {
    'use strict';

    angular
        .module('jass.routes')
        .config(config);

    config.$inject = ['$routeProvider'];

    /**
     * @name config
     * @desc Define valid application routes
     */
    function config($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'IndexController',
                controllerAs: 'vm',
                templateUrl: '/static/templates/layout/index.html'})
            .when('/requests', {
                controller: 'RequestsController',
                controllerAs: 'vm',
                templateUrl: '/static/templates/layout/latestrequests.html'})
            .when('/comparisons/:media_id/:event', {
                controller: 'ComparisonsController',
                controllerAs: 'vm',
                templateUrl: '/static/templates/layout/comparisons.html'})
            .otherwise('/');
    }
})();

