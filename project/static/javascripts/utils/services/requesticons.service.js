(function ($, _) {
    'use strict';

    angular
        .module('jass.utils.services')
        .factory('RequestIcons', RequestIcons);

    function RequestIcons() {
        var RequestIcons = {
            findAll: findAllIcons
        };

        return RequestIcons;

        function findAllIcons(inputrequest) {
            inputrequest.icons = {};

            if (inputrequest.user_agent) {
                if (inputrequest.user_agent.toLowerCase().indexOf('mac os x')) {
                    if (inputrequest.user_agent.toLowerCase().indexOf('os x 10.10') != -1) {
                        inputrequest.icons['os'] = '/static/images/icon-desktop-mac-yosemite.png'
                    }
                    else if (inputrequest.user_agent.toLowerCase().indexOf('os x 10.11') != -1) {
                        inputrequest.icons['os'] = '/static/images/icon-desktop-mac-elcapitan.png'
                    }
                }
                else if (inputrequest.user_agent.toLowerCase().indexOf('android')) {
                    inputrequest.icons['os'] = '/static/images/icon-os-android.png';
                }

                if (inputrequest.user_agent.toLowerCase().indexOf('firefox') != -1) {
                    inputrequest.icons['browser'] = '/static/images/icon-browser-firefox.png'
                }
                else if (inputrequest.user_agent.toLowerCase().indexOf('chrome') != -1) {
                    inputrequest.icons['browser'] = '/static/images/icon-browser-chrome.png'
                }
                else if (inputrequest.user_agent.toLowerCase().indexOf('safari') != -1) {
                    inputrequest.icons['browser'] = '/static/images/icon-browser-safari.png'
                }

                if (inputrequest.user_agent.toLowerCase().indexOf('cfnetwork') != -1) { // iOS only
                    if (inputrequest.user_agent.toLowerCase().indexOf('srfplayer') != -1) {
                        inputrequest.icons['app'] = '/static/images/icon-app-ios-play-srf.png';
                    }
                    else if (inputrequest.user_agent.toLowerCase().indexOf('rtsplayer') != -1) {
                        inputrequest.icons['app'] = '/static/images/icon-app-ios-play-rts.png';
                    }
                    else if (inputrequest.user_agent.toLowerCase().indexOf('rsiplayer') != -1) {
                        inputrequest.icons['app'] = '/static/images/icon-app-ios-play-rsi.png';
                    }
                    else if (inputrequest.user_agent.toLowerCase().indexOf('rtrplayer') != -1) {
                        inputrequest.icons['app'] = '/static/images/icon-app-ios-play-rtr.png';
                    }
                    else if (inputrequest.user_agent.toLowerCase().indexOf('swiplayer') != -1) {
                        inputrequest.icons['app'] = '/static/images/icon-app-ios-play-swi.png';
                    }
                }
            }

            if (inputrequest.request_arguments !== undefined) {
                var tmp_dict = {};

                if (Object.prototype.toString.call( inputrequest.request_arguments ) === '[object Array]' ) {
                    for (var i = 0; i < inputrequest.request_arguments.length; i++) {
                        var arg = inputrequest.request_arguments[i];
                        tmp_dict[arg.key] = arg.value;
                    }
                }
                else {
                    tmp_dict = inputrequest.request_arguments;
                }

                if (tmp_dict['ns_ap_pn'] !== undefined) {
                    if (tmp_dict['ns_ap_pn'].toLowerCase() === 'android') {
                        inputrequest.icons['os'] = '/static/images/icon-os-android.png';
                        if (tmp_dict['srg_unit'] !== undefined) {
                            inputrequest.icons['app'] = '/static/images/icon-app-android-play-'+tmp_dict['srg_unit'].toLowerCase()+'.png';
                        }
                    }
                    else if (tmp_dict['ns_ap_pn'].toLowerCase() === 'ios') {
                        if (tmp_dict['ns_ap_pv'] !== undefined && tmp_dict['ns_ap_pv'].length) {
                            inputrequest.icons['os'] = '/static/images/icon-os-ios'+tmp_dict['ns_ap_pv'].substr(0, 1)+'.png';
                            if (tmp_dict['srg_unit'] !== undefined) {
                                inputrequest.icons['app'] = '/static/images/icon-app-ios-play-'+tmp_dict['srg_unit'].toLowerCase()+'.png';
                            }
                        }
                    }
                }
            }
        }
    }
})();

