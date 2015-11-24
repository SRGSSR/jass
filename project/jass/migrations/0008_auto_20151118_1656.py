# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jass', '0007_auto_20151104_1012'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inputrequest',
            name='url',
            field=models.URLField(max_length=20000, null=True, blank=True),
        ),
    ]
