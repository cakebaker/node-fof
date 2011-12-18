var util = require('util'),
    events = require('events'),
    http = require('http');

function Twitter(screenName) {
    var twitterClient = http.createClient(80, 'api.twitter.com');

    this.makeRequest = function(type, callback) {
        var usernames = [];
        var cursor = -1;

        return function() {
            var callee = arguments.callee;
            var request = twitterClient.request('GET', '/1/statuses/'+type+'.json?screen_name='+screenName+'&cursor='+cursor, {'host': 'api.twitter.com'});

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
                            callback(usernames);
                        }
                    } else {
                        util.puts('An error occured: ' + response.statusCode);
                        process.exit(1);
                    }
                });
            });

            request.end();
        }
    }
};

exports.Twitter = Twitter;

Twitter.prototype.getUsernames = function(strategy) {
    this.resultContainer = new ResultBucket();
    this.resultContainer.addListener('full', function(friends, followers) {
        strategy.execute(friends, followers);
    });
    this.getFollowers();
    this.getFriends();
}

Twitter.prototype.getFollowers = function() {
    this.makeRequest('followers', this.resultContainer.setFollowers)();
}

Twitter.prototype.getFriends = function() {
    this.makeRequest('friends', this.resultContainer.setFriends)();
}

function ResultBucket() {
    var that = this;
    var friends, followers;

    this.setFollowers = function(followers) {
        this.followers = followers;

        if (typeof(this.friends) == 'object') {
            that.emit('full', this.friends, this.followers);
        }
    };

    this.setFriends = function(friends) {
        this.friends = friends;

        if (typeof(this.followers) == 'object') {
            that.emit('full', this.friends, this.followers);
        }
    };
}

util.inherits(ResultBucket, events.EventEmitter);
