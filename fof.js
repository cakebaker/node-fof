var sys = require('sys'),
    http = require('http'),
    arrayDiff = require('./array').array_diff,
    caseInsensitiveSort = require('./sort').caseInsensitiveSort;

if (process.argv.length < 3) {
    sys.puts('No twitter user name specified.');
    process.exit(1);
}

var username = process.argv[2];
var twitter = http.createClient(80, 'api.twitter.com');

function getUsernames(type, callback) {
    var usernames = [];
    var cursor = -1;

    return function() {
        var callee = arguments.callee;
        var request = twitter.request('GET', '/1/statuses/'+type+'.json?screen_name='+username+'&cursor='+cursor, {'host': 'api.twitter.com'});

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

function getPeopleNotFollowingBack() {
    var friends;
    var followers;

    return function(type, usernames) {
        var sortedUsernames = usernames.sort(caseInsensitiveSort);

        if (type == 'friends') {
            friends = sortedUsernames;
        } else {
            followers = sortedUsernames;
        }

        if (typeof(friends) == 'object' && typeof(followers) == 'object') {
            var diff = arrayDiff(friends, followers);

            for (var prop in diff) {
                sys.puts(diff[prop]);
            }
        }
    }
}

var callback = getPeopleNotFollowingBack();
getUsernames('friends', callback)();
getUsernames('followers', callback)();
