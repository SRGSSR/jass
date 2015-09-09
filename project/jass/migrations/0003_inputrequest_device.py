# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jass', '0002_auto_20150908_1503'),
    ]

    operations = [
        migrations.AddField(
            model_name='inputrequest',
            name='device',
            field=models.CharField(default=b'UNKNOWN', max_length=10, blank=True, choices=[(b'UNKNOWN', b'UNKNOWN'), (b'iPhone', b'iPhone')]),
        ),
    ]
