
from rest_framework import generics

from project.jass import models
from project.jass import serializers


class InputRequestListAPIView(generics.ListCreateAPIView):
    queryset = models.InputRequest.objects.all()
    serializer_class = serializers.InputRequestSerializer

class InputRequestDetailAPIView(generics.RetrieveAPIView):
    queryset = models.InputRequest.objects.all()
    serializer_class = serializers.InputRequestSerializer
