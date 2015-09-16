
from rest_framework import generics

from project.jass import models
from project.jass import serializers
from rest_framework import pagination

class InputRequestsPagination(pagination.PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000


class InputRequestListAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.InputRequestSerializer
    pagination_class = InputRequestsPagination

    def get_queryset(self):
        queryset = models.InputRequest.objects.all().order_by('-date')
        method = self.request.query_params.get('method', None)
        if method is not None:
            queryset = queryset.filter(method=method)
        hostname = self.request.query_params.get('hostname', None)
        if hostname is not None:
            queryset = queryset.filter(url__contains=hostname)
        return queryset

class InputRequestDetailAPIView(generics.RetrieveAPIView):
    queryset = models.InputRequest.objects.all()
    serializer_class = serializers.InputRequestSerializer
