Introduction
---------
JASS is an online- tool that catches up requests made to comScore, and allow to display, filter, and compare statistics
labels. It works with a small HTTP Proxy through which requests flow, and are sent to the JASS.

To make it work, one must install a small utility (mitmproxy) on any 'proxy computer'. Assuming they are on the
same WIFI, test mobile devices (phones, tablets) as well as any other computers must choose the same wifi of the proxy, 
and enter its IP address and port in the network "Proxy" configuration.


Requirements
------------
* mitmproxy: `brew install mitmproxy`
* requests python library: `sudo easy_install requests`, or `sudo pip install requests`

Usage
-----
• Open a terminal
• Move to the directory of this documentation
• Enter the following command: `./start.sh`
• The proxy is started, and the IP address with its port to use in the network configuration of test devices is printed.


