from django.db import models

# Create your models here.

class InputRequest(models.Model):
    origin = models.CharField(max_length=25, null=True, blank=True)
    url = models.URLField(null=True, blank=True)
    data = models.CharField(max_length=10000, null=True, blank=True)

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
    date = models.DateTimeField(auto_now_add=True)

class RequestHeader(models.Model):
    key = models.CharField(max_length=10000, null=True, blank=True)
    value = models.CharField(max_length=10000, null=True, blank=True)
    request = models.ForeignKey(InputRequest, null=True, blank=True, related_name='headers')
