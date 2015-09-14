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
            .otherwise('/');
    }
})();

