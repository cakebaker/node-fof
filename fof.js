var sys = require('sys'),
    http = require('http');

var twitter = http.createClient(80, 'api.twitter.com');

var getTweets = function(nextCursor) {
    var callee = arguments.callee;
    var friendsRequest = twitter.request('GET', '/1/statuses/friends.json?screen_name=dhofstet&cursor='+nextCursor, {'host': 'api.twitter.com'});

    friendsRequest.addListener('response', function(response) {
	var data = '';
	response.addListener('data', function(chunk) {
	    data += chunk;
	});
	response.addListener('end', function() {
	    tweets = JSON.parse(data);
	    var users = tweets['users'], length = users.length;

	    for (var i = 0; i < length; i++) {
		sys.puts(users[i].screen_name);
	    }

	    sys.puts(tweets.next_cursor);

	    if (tweets.next_cursor > 0) {
		callee(tweets.next_cursor);
	    }
	});
    });

    friendsRequest.end();
}(-1);

