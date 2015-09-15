# -*- coding: utf-8 -*-

from defaults import *

DEBUG = False
TEMPLATE_DEBUG = DEBUG

ALLOWED_HOSTS = [
    'jass-prod.herokuapp.com',
]

SITE_ID = 3  # Local=1, Staging=2, Prod=3

INSTALLED_APPS += ('lockdown',)
MIDDLEWARE_CLASSES += ('lockdown.middleware.LockdownMiddleware',)

LOCKDOWN_FORM = 'lockdown.forms.LockdownForm'
LOCKDOWN_PASSWORDS = ('PlayMobileCodeShines',)
LOCKDOWN_URL_EXCEPTIONS = (r'^admin/$', r'^static/$',)

