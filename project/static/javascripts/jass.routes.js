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
            .when('/proxies', {
                controller: 'ProxiesController',
                controllerAs: 'vm',
                templateUrl: '/static/templates/layout/proxies.html'})

            .when('/inputrequests', {
                controller: 'InputRequestsController',
                controllerAs: 'vm',
                templateUrl: '/static/templates/layout/latestrequests.html'})
            .when('/inputrequests/:bu', {
                controller: 'InputRequestsController',
                controllerAs: 'vm',
                templateUrl: '/static/templates/layout/latestrequests.html'})

            .when('/events', {
                controller: 'EventsController',
                controllerAs: 'vm',
                templateUrl: '/static/templates/layout/latestevents.html'})

            .when('/comparisons', {
                controller: 'ComparisonsController',
                controllerAs: 'vm',
                templateUrl: '/static/templates/layout/comparisons.html'})
    }
})();

