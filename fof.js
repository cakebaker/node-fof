var sys = require('sys'),
    http = require('http'),
    arrayDiff = require('./array').array_diff;

if (process.argv.length < 3) {
    sys.puts('No twitter user name specified.');
    process.exit(1);
}

var username = process.argv[2];
var twitter = http.createClient(80, 'api.twitter.com');
var friends = [];
var followers = [];

var getTweets = function(nextCursor, twitterApiMethod) {
    var callee = arguments.callee;
    var request = twitter.request('GET', '/1/statuses/'+twitterApiMethod+'.json?screen_name='+username+'&cursor='+nextCursor, {'host': 'api.twitter.com'});

    request.addListener('response', function(response) {
	var data = '';

	response.addListener('data', function(chunk) {
	    data += chunk;
	});

	response.addListener('end', function() {
	    tweets = JSON.parse(data);
	    var users = tweets['users'], length = users.length;

	    for (var i = 0; i < length; i++) {
		friends.push(users[i].screen_name);
		sys.puts(users[i].screen_name);
	    }

	    sys.puts(tweets.next_cursor);

	    if (tweets.next_cursor > 0) {
		callee(tweets.next_cursor, twitterApiMethod);
	    }
	});
    });

    request.end();
};

getTweets(-1, 'friends');
getTweets(-1, 'followers');

/*
sys.puts('--------------------------');
var diff = arrayDiff(friends, followers);

for (var prop in diff) {
    sys.puts("\n "+diff[prop]);
}
*/
