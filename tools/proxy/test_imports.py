import sys

try:
    __import__('imp').find_module('requests')
    sys.exit(0)
except ImportError:
    print "Please install requests python module using the following command:"
    print "sudo pip requests"
    sys.exit(1)

