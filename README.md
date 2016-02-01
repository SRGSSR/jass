# jass
Just Another Statistics Sniffer

## Development

Tools
- [https://www.jetbrains.com/pycharm/ PyCharm]
- mitm (see proxy install)
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