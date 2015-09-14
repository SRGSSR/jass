#!/usr/bin/env python

import json
import requests

from libmproxy.script import concurrent

#For more info on requests: https://mitmproxy.org/doc/scripting/inlinescripts.html
# method must be inside ['GET', 'POST']

# @concurrent
def request(context, flow):
    if flow.request.scheme == "http" and flow.request.host in ['il.srgssr.ch', 'b.scorecardresearch.com']:

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

        cookies = flow.request.get_cookies()
        if cookies is not None and len(cookies.get("UID")) > 0:
            payload['sessionid'] = cookies.get("UID")[0]

        r = requests.post("http://jass-prod.herokuapp.com/api/inputrequests/", json=payload)
        print 10*'-', r.status_code, 80*"-"
