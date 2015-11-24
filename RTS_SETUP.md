# jass
Just Another Statistics Sniffer

## Local Setup @ RTS Multimedia

Here is the current setup used by the RTS:
### Device setup
- All device are setup to use SPA-TEAM-CH Wifi
- Proxy ```192.168.3.3:8080```
- First time the proxy is used on a device, browse ```mitm.it``` to install the SSL Certificate

### Mac mini setup
- Mac mini setup to 192.168.3.3 (ethernet) and 192.168.3.4 (wifi)
- mitmproxy is set up to run on a "screen"
  - ```screen -x``` to recover the screen currently used one and check current proxy and or restart it
  - or ```screen``` to start a new one, then ```cd ~/jass/tools/proxy/``` & ```./start.sh```
  - ```man screen``` for more info :p

