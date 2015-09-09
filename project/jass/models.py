from django.db import models

# Check https://github.com/ua-parser/uap-python
# http://werkzeug.pocoo.org/docs/0.10/utils/#url-helpers

class InputRequest(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    origin = models.CharField(max_length=25, null=True, blank=True)
    url = models.URLField(max_length=2000, null=True, blank=True)
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

    METHOD_VALUES = METHOD_KEYS
    METHOD_CHOICES = tuple(zip(METHOD_KEYS, METHOD_VALUES))
    method = models.CharField(max_length=10, blank=True, choices=METHOD_CHOICES, default=METHOD_UNKNOWN)


class RequestHeader(models.Model):
    key = models.CharField(max_length=10000, null=True, blank=True)
    value = models.CharField(max_length=10000, null=True, blank=True)
    request = models.ForeignKey(InputRequest, null=True, blank=True, related_name='headers')
