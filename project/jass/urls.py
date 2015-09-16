from django.conf import settings
from django.conf.urls import patterns, url, include

from project.jass import views
from project.jass import api

if settings.SITE_ID == 3:
    robots_content = ""
else:
    robots_content = "User-agent: *\nDisallow: /"

urlpatterns = patterns('',
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),

    url(r'^api/inputrequests/(?P<bu>(srf|rts|rsi|rtr|swi))$', api.InputRequestBUListAPIView.as_view()),
    # url(r'^api/inputrequests/$', api.InputRequestListAPIView.as_view()),

    url(r'^api/inputrequests/(?P<pk>.*)$', api.InputRequestDetailAPIView.as_view()),

    url('^.*$', views.IndexView.as_view(), name='index'),
)
