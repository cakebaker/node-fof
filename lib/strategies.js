var sys = require('sys'),
    caseInsensitiveSort = require('./sort').caseInsensitiveSort,
    arrayDiff = require('./array').array_diff,
    arrayIntersection = require('./array').array_intersect;

function StrategyFactory() {
}

StrategyFactory.getFanStrategy = function() {
    return new OutputStrategy(new FanStrategy());
}

StrategyFactory.getFriendStrategy = function() {
    return new OutputStrategy(new FriendStrategy());
}

StrategyFactory.getNotFollowingBackStrategy = function() {
    return new OutputStrategy(new NotFollowingBackStrategy());
}

exports.StrategyFactory = StrategyFactory;

function OutputStrategy(strategy) {
    this.execute = function(friends, followers) {
        var result = strategy.execute(friends.sort(caseInsensitiveSort), followers.sort(caseInsensitiveSort));
        var resultCount = 0;

        for (var prop in result) {
            sys.puts(result[prop]);
            resultCount++;
        }

        if (resultCount == 0) {
            sys.puts('No people found');
        } else {
            sys.puts(resultCount + ' people found');
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
