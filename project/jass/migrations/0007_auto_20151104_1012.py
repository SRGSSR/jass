# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jass', '0006_auto_20150909_1344'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inputrequest',
            name='method',
            field=models.CharField(default=b'UNKNOWN', max_length=10, blank=True, choices=[(b'UNKNOWN', b'Unknown Method'), (b'GET', b'GET'), (b'POST', b'POST')]),
        ),
    ]
