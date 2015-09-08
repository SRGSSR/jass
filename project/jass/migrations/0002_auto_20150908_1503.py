# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jass', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inputrequest',
            name='origin',
            field=models.CharField(max_length=25, null=True, blank=True),
        ),
    ]
