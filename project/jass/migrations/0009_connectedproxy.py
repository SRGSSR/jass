# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jass', '0008_auto_20151118_1656'),
    ]

    operations = [
        migrations.CreateModel(
            name='ConnectedProxy',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('externalIp', models.CharField(max_length=100, null=True, blank=True)),
                ('localIp', models.CharField(max_length=100, null=True, blank=True)),
                ('name', models.CharField(max_length=100, null=True, blank=True)),
                ('lastDataReceived', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
