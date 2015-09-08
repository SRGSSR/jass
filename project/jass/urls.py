from django.conf import settings
from django.conf.urls import patterns, url, include
from project.jass import views

if settings.SITE_ID == 3:
    robots_content = ""
else:
    robots_content = "User-agent: *\nDisallow: /"

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
)
