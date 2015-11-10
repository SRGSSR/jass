# -*- coding: utf-8 -*-

from defaults import *

DEBUG = False

ALLOWED_HOSTS = [
    'jass-prod.herokuapp.com',
]

SITE_ID = 3  # Local=1, Staging=2, Prod=3

WS4REDIS_CONNECTION = {
    'host': 'pub-redis-13828.eu-west-1-2.2.ec2.garantiadata.com',
    'port': 13828,
    'db': 0,
    'password': 'GOFxkqXF1LZM3ZbV',
}
