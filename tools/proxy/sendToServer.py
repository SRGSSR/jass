#!/usr/bin/env python

import json
import requests

from libmproxy.script import concurrent

# Arguments:
# 1) webservice receiving all requests

def start(context, argv):
    if len(argv) != 2:
        raise ValueError('Usage: -s "sendToServer.py webservice_api"')
    # You may want to use Python's argparse for more sophisticated argument
    # parsing.
    context.api = argv[1]

#For more info on requests: https://mitmproxy.org/doc/scripting/inlinescripts.html
# method must be inside ['GET', 'POST']

@concurrent
def request(context, flow):
    if flow.request.host in ['il.srgssr.ch', 'b.scorecardresearch.com', 'sb.scorecardresearch.com']:

        headers = []
        user_agent = None
        for header in flow.request.headers:
            json_header = {
                "key": header[0],
                "value": header[1]
            }
            headers.append(json_header)
            if header[0] == 'User-Agent':
                user_agent = header[1]

        payload = {
            "method": flow.request.method.upper(),
            "url": flow.request.url.strip(),
            "headers": headers,
            "origin": flow.client_conn.address.host
        }

        if user_agent is not None:
            payload['user_agent'] = user_agent

#        cookies = flow.request.get_cookies()
#        if cookies.get("UID", None) is not None and len(cookies.get("UID")) > 0:
#            payload['sessionid'] = cookies.get("UID")[0]

        r = requests.post(context.api, json=payload)
        print 10*'-', r.status_code, 80*"-"
