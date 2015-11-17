#! /bin/bash
PORT=8080
JASS_PROD_SERVER="http://jass-prod.herokuapp.com"
JASS_STAGING_SERVER="http://jass-staging.herokuapp.com"

if ! which mitmdump >/dev/null ; then
  cat <<EOF
This requires mitmproxy.
sudo pip install mitmproxy

or see https://mitmproxy.org/
(and https://pip.pypa.io about pip)
EOF
exit
fi
if ! python test_imports.py ; then
  exit
fi

JASS_SERVER=$JASS_PROD_SERVER
if [[ "$1" == "staging" || "$1" == "2" ]] ; then
  JASS_SERVER=$JASS_STAGING_SERVER
fi

echo Proxy started. The IP address to use as Manual Proxy in test devices is
for i in `ifconfig |grep inet |grep -v inet6 |cut -d ' ' -f 2` ; do
  echo $i:8080
done
echo You can see the results at: $JASS_SERVER

JASS_API="$JASS_SERVER/api/inputrequests/"
mitmdump -p $PORT -s "sendToServer.py $JASS_API"
