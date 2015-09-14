(function () {
    'use strict';

    angular
        .module('jass.config')
        .config(config);

    config.$inject = ['$locationProvider'];

    /**
     * @name config
     * @desc Enable HTML5 routing
     * See https://thinkster.io/django-angularjs-tutorial/
     */
    function config($locationProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }
})();
