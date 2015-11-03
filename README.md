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
- Create database ( ```createdb jass``` )
- Download PyCharm community edition (or better)
- Inside PyCharm
 - open jass project
 - create virtual environment (Settings / Project: jass / Project interpreter / (Settings wheel) )
 - open any .py and click on "install requirements"
 - if psycopg2 fails to install go to virtual env binary directory and run ```./pip install psycopg2```
- Migrate the database
 - ```export DJANGO_SETTINGS_MODULE=project.settings.dev```
 - ```~/.virtualenvs/jass_debug/bin/python manage.py migrate```
- Install bower
 - ```sudo npm install -g bower```
 -  ~/.virtualenvs/jass_debug/bin/python manage.py bower install
- ```~/.virtualenvs/jass_debug/bin/python manage.py collectstatic --noinput```
