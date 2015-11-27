from django.db import models


# About custom objects Manager of Django model classes: https://docs.djangoproject.com/en/1.8/topics/db/managers/
class InputRequestManager(models.Manager):
    def get_queryset(self):
        return super(InputRequestManager, self).get_queryset().order_by('-date')

    def all_comScore(self):
        return self.get_queryset().filter(url__contains='b.scorecardresearch.com')


# For parsing User-Agents, check https://github.com/ua-parser/uap-python
# or http://werkzeug.pocoo.org/docs/0.10/utils/#url-helpers

class InputRequest(models.Model):
    objects = InputRequestManager()

    date = models.DateTimeField(auto_now_add=True)
    origin = models.CharField(max_length=25, null=True, blank=True)
    url = models.URLField(max_length=20000, null=True, blank=True)
    data = models.CharField(max_length=10000, null=True, blank=True)
    sessionid = models.CharField(max_length=100, null=True, blank=True)
    user_agent = models.CharField(max_length=200, null=True, blank=True)

    METHOD_UNKNOWN = "UNKNOWN"
    METHOD_GET = "GET"
    METHOD_POST = "POST"

    METHOD_KEYS = (
        METHOD_UNKNOWN,
        METHOD_GET,
        METHOD_POST,
    )

    METHOD_VALUES = (
        "Unknown Method",
        METHOD_GET,
        METHOD_POST
    )

    METHOD_CHOICES = tuple(zip(METHOD_KEYS, METHOD_VALUES))
    method = models.CharField(max_length=10, blank=True, choices=METHOD_CHOICES, default=METHOD_UNKNOWN)


class RequestHeader(models.Model):
    key = models.CharField(max_length=10000, null=True, blank=True)
    value = models.CharField(max_length=10000, null=True, blank=True)
    request = models.ForeignKey(InputRequest, null=True, blank=True, related_name='headers')

class ConnectedProxy(models.Model):
    externalIp = models.CharField(max_length=100, null=True, blank=True)
    localIp = models.CharField(max_length=100, null=True, blank=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    lastDataReceived = models.DateTimeField(auto_now=True)