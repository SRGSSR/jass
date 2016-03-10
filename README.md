# jass
Just Another Statistics Sniffer

## Introduction
JASS is an online- tool that catches up requests made to comScore, and allow to display, filter, and compare statistics
labels. It works with a small HTTP Proxy through which requests flow, and are sent to the JASS.

To make it work, one must install a small utility (mitmproxy) on any 'proxy computer'. Assuming they are on the
same WIFI, test mobile devices (phones, tablets) as well as any other computers must choose the same wifi of the proxy, 
and enter its IP address and port in the network "Proxy" configuration.


## Requirements
- mitmproxy: `brew install mitmproxy`, or `pip install mitmproxy`
- requests python library: `sudo easy_install requests`, or `sudo pip install requests`

## Usage
- Open a terminal
- Go to the tools/proxy of the local copy of this repository
- Enter the following command: `./start.sh`
- The proxy is started, and the IP address with its port to use in the network configuration of test devices is printed.
- Install https certificate for your proxy by browsing http://mitm.it on your test device

## Development

Tools
- [https://www.jetbrains.com/pycharm/ PyCharm]
- postgresql
- Node package manager ( npm )

# Development environment setup

- Install PostgreSQL ( ```brew install postgresql``` )
- Make sure to have PostgreSQL running ( ```postgres -D /usr/local/var/postgres``` for default brew formula )
- Make sure to have redis running ( ```redis-server``` will say it runs @ ```localhost:6379``` for default install )
- Create database ( ```createdb jass``` )
- Download PyCharm community edition (or better)

- Inside PyCharm
 - open jass project
 - create virtual environment (Settings / Project: jass / Project interpreter / (Settings wheel) )
 - open any .py and click on "install requirements"
 - if psycopg2 fails to install, go to virtual env binary directory and run ```./pip install psycopg2```
 - if django-websocket-redis fails, make sure to install correctly/manually ```gevent``` (```Cython``` might be required, globally on your system).
 
- Migrate the database
 - ```export DJANGO_SETTINGS_MODULE=project.settings.dev```
 - ```~/.virtualenvs/jass_debug/bin/python manage.py migrate```
- Install bower
 - ```sudo npm install -g bower```
 - ```~/.virtualenvs/jass_debug/bin/python manage.py bower install```
- ```~/.virtualenvs/jass_debug/bin/python manage.py collectstatic --noinput```
- Install fixtures to test:
 - ```~/.virtualenvs/jass_debug/bin/python manage.py loaddata project/jass/fixtures/prod_2015-09-22T11:00.json```

# Test without proxy
You can simulate new requests with:
```curl -v -H "Content-Type: application/json"  -d '{ "method":"GET", "url":"http://il.srgssr.ch/integrationlayer/1.0/ue/srf/video/play/test_url.json", "headers": [ {"key":"keyOne","value":"value1"}], "user_agent": "testCurl", "origin": "1.1.1.1" }' http://jass-staging.herokuapp.com/api/inputrequests/```
