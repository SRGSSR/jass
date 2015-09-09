# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jass', '0005_remove_inputrequest_device'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inputrequest',
            name='url',
            field=models.URLField(max_length=2000, null=True, blank=True),
        ),
    ]
