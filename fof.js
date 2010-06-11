var sys = require('sys'),
    http = require('http');

var twitter = http.createClient(80, 'api.twitter.com');
var friendsRequest = twitter.request('GET', '/1/statuses/friends.json?screen_name=dhofstet&cursor=-1', {'host': 'api.twitter.com'});

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
    });
});

friendsRequest.end();
