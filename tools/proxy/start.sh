#! /bin/sh
PORT=8080
JASS_SERVER="http://jass-prod.herokuapp.com"
JASS_API="$JASS_SERVER/api/inputrequests/"

if ! which mitmdump >/dev/null ; then
  cat <<EOF
This requires mitm proxy.
brew install mitmproxy

or see https://mitmproxy.org/
EOF
exit
fi
if ! python test_imports.py ; then
  exit
fi

echo Proxy started, listening to
for i in `ifconfig |grep inet |grep -v inet6 |cut -d ' ' -f 2` ; do
  echo $i:8080
done
echo You can see the results at: $JASS_SERVER

mitmdump -p $PORT -s "sendToServer.py $JASS_API"
