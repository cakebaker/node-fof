var sys = require('sys'),
    caseInsensitiveSort = require('./sort').caseInsensitiveSort,
    arrayDiff = require('./array').array_diff,
    arrayIntersection = require('./array').array_intersect;

exports.fanStrategy = function() {
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
            var diff = arrayDiff(followers, friends);

            for (var prop in diff) {
                sys.puts(diff[prop]);
            }
        }
    }
}

exports.friendStrategy = function() {
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
            var intersection = arrayIntersection(friends, followers);

            for (var prop in intersection) {
                sys.puts(intersection[prop]);
            }
        }
    }
}

exports.notFollowingBackStrategy = function() {
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
