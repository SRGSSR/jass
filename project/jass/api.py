
from django.db.models import Q
from rest_framework import generics

from project.jass import models
from project.jass import serializers
from rest_framework import pagination

class InputRequestsPagination(pagination.PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000


class InputRequestListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.InputRequestSerializer
    # pagination_class = InputRequestsPagination

    def get_queryset(self):
        queryset = models.InputRequest.objects.all().order_by('-date')

        for k,v in self.request.query_params.items():
            if k == 'origin':
                queryset = queryset.filter(method=v)
            elif k == 'url':
                queryset = queryset.filter(url=v)
            elif k == 'sessionid':
                queryset = queryset.filter(sessionid=v)
            elif k == 'user_agent':
                queryset = queryset.filter(user_agent=v)
            elif k == 'method':
                queryset = queryset.filter(method=v)
            else:
                queryset = queryset.filter(url__contains=k+'='+v)

        return queryset

class InputRequestBUListAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.InputRequestSerializer
    pagination_class = InputRequestsPagination

    def get_queryset(self):
        queryset = models.InputRequest.objects.all().order_by('-date')

        bu = self.kwargs.get('bu', None)
        if bu is not None:
            # https://docs.djangoproject.com/en/1.8/topics/db/queries/#complex-lookups-with-q
            bu_filter = Q(url__contains='srg_unit='+bu.lower()) | Q(url__contains='srg_unit='+bu.upper())
            queryset = queryset.filter(bu_filter)

        return queryset

class InputRequestDetailAPIView(generics.RetrieveAPIView):
    queryset = models.InputRequest.objects.all()
    serializer_class = serializers.InputRequestSerializer

