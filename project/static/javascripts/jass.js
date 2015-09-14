(function () {
    'use strict';

    angular
        .module('jass', [
            'jass.config',
            'jass.routes',
            'jass.layout',
            'jass.utils',
            'jass.inputrequests'
        ]);

    angular
        .module('jass.config', []);

    angular
        .module('jass.routes', ['ngRoute']);

    angular
        .module('jass')
        .run(run);

    run.$inject = ['$http'];

    /**
     * @name run
     * @desc Update xsrf $http headers to align with Django's defaults
     */
    function run($http) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }
})();

