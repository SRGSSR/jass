from rest_framework import serializers
from .models import *

class RequestHeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestHeader
        fields = ('key', 'value')

    def to_representation(self, instance):
        return {instance.key: instance.value}


class HeaderSerializerField(serializers.Field):
    def to_representation(self, obj):
        return {str(item.get()): item.get().value for item in obj}

class HeaderSerializerDictField(serializers.DictField):
    child = HeaderSerializerField()

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