# -*- coding: utf-8 -*-

from defaults import *

DEBUG = False

ALLOWED_HOSTS = [
    'jass-staging.herokuapp.com',
]

SITE_ID = 2  # Local=1, Staging=2, Prod=3

WS4REDIS_CONNECTION = {
    'host': 'pub-redis-19533.eu-west-1-2.2.ec2.garantiadata.com',
    'port': 19533,
    'db': 0,
    'password': 'SitquU5QT28GyDmz',
}
