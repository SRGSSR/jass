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
                var lower_user_agent = inputrequest.user_agent.toLowerCase();

                if (lower_user_agent.indexOf('mac os x')) {
                    if (lower_user_agent.indexOf('os x 10.10') != -1) {
                        inputrequest.icons['os'] = '/static/images/icon-desktop-mac-yosemite.png'
                    }
                    else if (lower_user_agent.indexOf('os x 10.11') != -1) {
                        inputrequest.icons['os'] = '/static/images/icon-desktop-mac-elcapitan.png'
                    }
                }
                else if (lower_user_agent.indexOf('android')) {
                    inputrequest.icons['os'] = '/static/images/icon-os-android.png';
                }

                if (lower_user_agent.indexOf('firefox') != -1) {
                    inputrequest.icons['browser'] = '/static/images/icon-browser-firefox.png'
                }
                else if (lower_user_agent.indexOf('chrome') != -1) {
                    inputrequest.icons['browser'] = '/static/images/icon-browser-chrome.png'
                }
                else if (lower_user_agent.indexOf('safari') != -1) {
                    inputrequest.icons['browser'] = '/static/images/icon-browser-safari.png'
                }

                if (lower_user_agent.indexOf('cfnetwork') != -1) { // iOS only
                    if (lower_user_agent.indexOf('srfplayer') != -1) {
                        inputrequest.icons['app'] = '/static/images/icon-app-ios-play-srf.png';
                    }
                    else if (lower_user_agent.indexOf('rtsplayer') != -1) {
                        inputrequest.icons['app'] = '/static/images/icon-app-ios-play-rts.png';
                    }
                    else if (lower_user_agent.indexOf('rsiplayer') != -1) {
                        inputrequest.icons['app'] = '/static/images/icon-app-ios-play-rsi.png';
                    }
                    else if (lower_user_agent.indexOf('rtrplayer') != -1) {
                        inputrequest.icons['app'] = '/static/images/icon-app-ios-play-rtr.png';
                    }
                    else if (lower_user_agent.indexOf('swiplayer') != -1) {
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

