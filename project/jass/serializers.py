from rest_framework import serializers
from .models import *

class RequestHeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestHeader
        fields = ('key', 'value')

class InputRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = InputRequest

    headers = RequestHeaderSerializer(many=True, required=False)

    def create(self, validated_data):
        headers_data = validated_data.pop('headers')
        input_request = InputRequest.objects.create(**validated_data)
        for header_data in headers_data:
            RequestHeader.objects.create(request=input_request, **header_data)
        return input_request