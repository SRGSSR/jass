# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jass', '0004_auto_20150909_1310'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='inputrequest',
            name='device',
        ),
    ]
