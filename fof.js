var util = require('util'),
    Options = require('./lib/option_parser').Options,
    OptionParser = require('./lib/option_parser').OptionParser,
    Twitter = require('./lib/twitter').Twitter,
    Factory = require('./lib/strategies').StrategyFactory;

var selectedOption = OptionParser.parse();

if (selectedOption != OptionParser.HELP && selectedOption != OptionParser.INVALID_OPTION) {
    var twitter = new Twitter(process.argv[2]);
}

switch (selectedOption) {
    case Options.FOLLOWING:        return twitter.getUsernames(Factory.getNotFollowingBackStrategy());
    case Options.FANS:             return twitter.getUsernames(Factory.getFanStrategy());
    case Options.FRIENDS:          return twitter.getUsernames(Factory.getFriendStrategy());
    case Options.HELP:             return showUsage();
    case Options.INVALID_OPTION:   util.puts('Invalid option');
                                   util.puts('');
                                   showUsage();
                                   process.exit(1);
}

function showUsage() {
    util.puts('Usage: node fof.js (<username>) ([OPTION])');
    util.puts('List <username>\'s Twitter fans, friends, or people he follows.');
    util.puts('');
    util.puts(' --fans         get people who follow <username>, but are not followed back');
    util.puts(' --following    get people who are followed by <username>, but don\'t follow back');
    util.puts(' --friends      get people who are followed by <username>, and follow back');
    util.puts(' --help         display this help and exit');
    util.puts('');
    util.puts('If no OPTION is specified, the --following option is used.');
}
