from django.shortcuts import render, render_to_response
from django.template import RequestContext

def index(request):
    context = RequestContext(request)
    context_dict = {"title": "JASS"}
    return render_to_response('jass/index.html', context_dict, context)


