var sys = require('sys'),
    caseInsensitiveSort = require('./lib/sort').caseInsensitiveSort,
    arrayDiff = require('./lib/array').array_diff,
    arrayIntersection = require('./lib/array').array_intersect;

function StrategyFactory() {
    this.getFanStrategy = function() {
        return new OutputStrategy(new FanStrategy());
    }

    this.getFriendStrategy = function() {
        return new OutputStrategy(new FriendStrategy());
    }

    this.getNotFollowingBackStrategy = function() {
        return new OutputStrategy(new NotFollowingBackStrategy());
    }
}

exports.StrategyFactory = StrategyFactory;

function OutputStrategy(strategy) {
    this.execute = function(friends, followers) {
        var result = strategy.execute(friends.sort(caseInsensitiveSort), followers.sort(caseInsensitiveSort));

        for (var prop in result) {
            sys.puts(result[prop]);
        }
    }
}

function FanStrategy() {
    this.execute = function(friends, followers) {
        return arrayDiff(followers, friends);
    }
}

function FriendStrategy() {
    this.execute = function(friends, followers) {
        return arrayIntersection(friends, followers);
    }
}

function NotFollowingBackStrategy() {
    this.execute = function(friends, followers) {
        return arrayDiff(friends, followers);
    }
}
