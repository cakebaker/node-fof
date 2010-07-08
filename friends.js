var sys = require('sys'),
    getUsernames = require('./twitter').getUsernames,
    getFriends = require('./strategies').friendStrategy;

if (process.argv.length < 3) {
    sys.puts('No twitter user name specified.');
    process.exit(1);
}

var screenName = process.argv[2];
var callback = getFriends();
getUsernames(screenName, 'friends', callback)();
getUsernames(screenName, 'followers', callback)();
