# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='InputRequest',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('origin', models.CharField(max_length=15, null=True, blank=True)),
                ('url', models.URLField(null=True, blank=True)),
                ('data', models.CharField(max_length=10000, null=True, blank=True)),
                ('method', models.CharField(default=b'UNKNOWN', max_length=10, blank=True, choices=[(b'UNKNOWN', b'UNKNOWN'), (b'GET', b'GET'), (b'POST', b'POST')])),
                ('date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='RequestHeader',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('key', models.CharField(max_length=10000, null=True, blank=True)),
                ('value', models.CharField(max_length=10000, null=True, blank=True)),
                ('request', models.ForeignKey(related_name='headers', blank=True, to='jass.InputRequest', null=True)),
            ],
        ),
    ]
