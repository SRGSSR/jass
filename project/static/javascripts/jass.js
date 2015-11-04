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

    var ws = new WebSocket('ws://127.0.0.1:8000/ws/ws1?subscribe-broadcast&publish-broadcast&echo');
    ws.onopen = function() {
        console.log("websocket connected");
    };
    ws.onmessage = function(e) {
        console.log("Received: " + e.data);
    };
    ws.onerror = function(e) {
        console.error(e);
    };
    ws.onclose = function(e) {
        console.log("connection closed");
    }
    function send_message(msg) {
        ws.send(msg);
    }
})();

