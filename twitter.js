var sys = require('sys'),
    http = require('http');

exports.getUsernames = function (screenName, type, callback) {
    var twitter = http.createClient(80, 'api.twitter.com');
    var usernames = [];
    var cursor = -1;

    return function() {
        var callee = arguments.callee;
        var request = twitter.request('GET', '/1/statuses/'+type+'.json?screen_name='+screenName+'&cursor='+cursor, {'host': 'api.twitter.com'});

        request.addListener('response', function(response) {
            var data = '';

            response.addListener('data', function(chunk) {
                data += chunk;
            });

            response.addListener('end', function() {
                if (response.statusCode == 200) {
                    tweets = JSON.parse(data);
                    var users = tweets['users'], length = users.length;

                    for (var i = 0; i < length; i++) {
                        usernames.push(users[i].screen_name);
                    }

                    if (tweets.next_cursor > 0) {
                        cursor = tweets.next_cursor;
                        callee();
                    } else {
                        callback(type, usernames);
                    }
                } else {
                    sys.puts('An error occured: ' + response.statusCode);
                    process.exit(1);
                }
            });
        });

        request.end();
    }
}
