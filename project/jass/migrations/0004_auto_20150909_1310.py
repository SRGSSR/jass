# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jass', '0003_inputrequest_device'),
    ]

    operations = [
        migrations.AddField(
            model_name='inputrequest',
            name='sessionid',
            field=models.CharField(max_length=100, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='inputrequest',
            name='user_agent',
            field=models.CharField(max_length=200, null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='inputrequest',
            name='device',
            field=models.CharField(default=b'UNKNOWN', max_length=10, blank=True, choices=[(b'UNKNOWN', b'UNKNOWN'), (b'iPhone', b'iPhone'), (b'Macintosh', b'Macintosh')]),
        ),
    ]
