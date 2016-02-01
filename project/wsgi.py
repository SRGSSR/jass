"""
WSGI config for jass project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/howto/deployment/wsgi/
"""

import os
import logging
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "jass.settings")

from django.conf import settings
from dj_static import Cling
from django.core.wsgi import get_wsgi_application
from ws4redis.uwsgi_runserver import uWSGIWebsocketServer

logger = logging.getLogger('testlogger')
logger.info('Django starting ' + str(settings.DEBUG))

if settings.DEBUG:
    application = Cling(get_wsgi_application())
else:
    _django_app = Cling(get_wsgi_application())
    _websocket_app = uWSGIWebsocketServer()

    def application(environ, start_response):
        if environ.get('PATH_INFO').startswith(settings.WEBSOCKET_URL):
            return _websocket_app(environ, start_response)
        return _django_app(environ, start_response)


