Introduction
---------
This small tool catches all statistics requests going through an HTTP Proxy and sends them to a JASS instance.

Installation
------------
* mitmproxy: `brew install mitmproxy`
* requests python library: `sudo easy_install requests`

Launch
------
`./start.sh` in the terminal

Usage
-----
Make sure your target device is on the same network as the proxy. Configure all test devices to use the proxy (the proxy server IP addresses are listed when starting start.sh)
