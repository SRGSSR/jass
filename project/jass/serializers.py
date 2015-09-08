from rest_framework import serializers
from .models import *

class InputRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = InputRequest
