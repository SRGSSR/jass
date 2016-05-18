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
    if flow.request.host in ['il.srf.ch', 'il.srgssr.ch', 'b.scorecardresearch.com', 'sb.scorecardresearch.com', 'srf.wemfbox.ch', 'rts.wemfbox.ch', 'rsi.wemfbox.ch', 'rtr.wemfbox.ch', 'swi.wemfbox.ch']:

        headers = []
        user_agent = None
        for header in flow.request.headers:
            json_header = {
                "key": header,
                "value": flow.request.headers[header]
            }
            headers.append(json_header)

        payload = {
            "method": flow.request.method.upper(),
            "url": flow.request.url.strip(),
            "content": flow.request.content,
            "headers": headers,
            "origin": flow.client_conn.address.host
        }

	f = open('log_payload.txt','a')
	f.write(str(payload))
	f.write("\n")
	f.close()

        if user_agent is not None:
            payload['user_agent'] = user_agent

#        cookies = flow.request.get_cookies()
#        if cookies.get("UID", None) is not None and len(cookies.get("UID")) > 0:
#            payload['sessionid'] = cookies.get("UID")[0]

        r = requests.post(context.api, json=payload)
