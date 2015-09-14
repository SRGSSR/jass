(function () {
    'use strict';

    angular
        .module('jass.inputrequests', [
            'jass.inputrequests.controllers',
            'jass.inputrequests.directives',
            'jass.inputrequests.services'
        ]);

    angular
        .module('jass.inputrequests.controllers', []);

    angular
        .module('jass.inputrequests.directives', ['ngDialog']);

    angular
        .module('jass.inputrequests.services', []);
})();
