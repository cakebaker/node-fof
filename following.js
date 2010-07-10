var sys = require('sys'),
    Twitter = require('./twitter').Twitter,
    StrategyFactory = require('./strategies').StrategyFactory;

if (process.argv.length < 3) {
    sys.puts('No twitter user name specified.');
    process.exit(1);
}

var twitter = new Twitter(process.argv[2]);
var factory = new StrategyFactory();
twitter.getUsernames(factory.getNotFollowingBackStrategy());
