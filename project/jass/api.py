
from django.db.models import Q
from rest_framework import generics
from ws4redis.publisher import RedisPublisher
from ws4redis.redis_store import RedisMessage

from project.jass import models
from project.jass import serializers
from rest_framework import pagination
import json

from project.jass.models import ConnectedProxy

# Test POST Request:
# curl -d "{'url': 'http://il.srgssr.ch/integrationlayer/1.0/ue/rts/video/mostClicked.json?pageSize=20&period=24'{'url', 'headers': [{'value': : 'debug/debugVersion (Linux; U; Android 5.0.1; HTC One_M8 Build/LRX22C)''http://il.srgssr.ch/integrationlayer/1.0/ue/rts/video/mostClicked.json?pageSize=20&period=24', 'headers': , 'key': [{'value': 'debug/debugVersion (Linux; U; Android 5.0.1; HTC One_M8 Build'/ULsReXr2-2ACg)e'nt', 'key'}, {'value': 'il.srgssr.ch', 'key': 'User-Agent'}, {'value': 'il.srgssr.ch': , 'key''Host'}: 'Host'}, {, {'value': 'Keep-Alive', 'key': 'Connection''value': }, 'Keep-Alive', 'key': 'Connection'{}, {'value''value': : 'gzip', 'key': 'Accept-Encoding''gzip', 'key': 'Accept-Encoding'}], 'method': 'GET', 'origin'}], : '192.168.3.127'}'method': 'GET', 'origin': '192.168.3.127'}" http://127.0.0.1:8000/api/inputrequests/

class InputRequestsPagination(pagination.PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

class InputRequestListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.InputRequestSerializer
    pagination_class = InputRequestsPagination

    def post(self, request, *args, **kwargs):
        ConnectedProxy.objects.update_or_create(externalIp=get_client_ip(request), localIp="localIp", name="unkownProxy")
        result = super(InputRequestListCreateAPIView, self).post(request, args, kwargs)
        if result.status_code == 201:
            message = RedisMessage(json.dumps(result.data))
            RedisPublisher(facility='ws1', broadcast=True).publish_message(message)
        return result

    def get_queryset(self):
        queryset = models.InputRequest.objects.all().order_by('-date')

        for k,v in self.request.query_params.items():
            # Catch up here first special case of BU parameter, to ease the filtering of all queries according to it.
            if k == 'bu':
                # https://docs.djangoproject.com/en/1.8/topics/db/queries/#complex-lookups-with-q
                bu_filter = Q(url__contains='srg_unit='+v.lower()) | Q(url__contains='srg_unit='+v.upper()) | Q(url__contains='/ue/'+v.lower())
                queryset = queryset.filter(bu_filter)
            elif k == 'origin':
                queryset = queryset.filter(method=v)
            elif k == 'sessionid':
                queryset = queryset.filter(sessionid=v)
            elif k == 'user_agent':
                queryset = queryset.filter(user_agent=v)
            elif k == 'method':
                queryset = queryset.filter(method=v)
            elif k == 'url':
                token_filter = None
                for token in v.split(" "):
                    token_filter = Q(url__contains=token) if token_filter is None else token_filter | Q(url__contains=token)
                queryset = queryset.filter(token_filter)
            else:
                queryset = queryset.filter(url__contains=k+'='+v)

        return queryset

class InputRequestDetailAPIView(generics.RetrieveAPIView):
    queryset = models.InputRequest.objects.all()
    serializer_class = serializers.InputRequestSerializer

class ConnectedProxyListAPIView(generics.ListCreateAPIView):
    queryset = models.ConnectedProxy.objects.all()
    serializer_class = serializers.ConnectProxySerializer

