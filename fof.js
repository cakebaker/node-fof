var sys = require('sys'),
    Options = require('./option_parser').Options,
    OptionParser = require('./option_parser').OptionParser,
    Twitter = require('./twitter').Twitter,
    Factory = require('./strategies').StrategyFactory;

var selectedOption = OptionParser.parse();

if (selectedOption != OptionParser.HELP && selectedOption != OptionParser.INVALID_OPTION) {
    var twitter = new Twitter(process.argv[2]);
}

switch (selectedOption) {
    case Options.FOLLOWING:        return twitter.getUsernames(Factory.getNotFollowingBackStrategy());
    case Options.FANS:             return twitter.getUsernames(Factory.getFanStrategy());
    case Options.FRIENDS:          return twitter.getUsernames(Factory.getFriendStrategy());
    case Options.HELP:             return showUsage();
    case Options.INVALID_OPTION:   sys.puts('Invalid option');
                                   sys.puts('');
                                   showUsage();
                                   process.exit(1);
}

function showUsage() {
    sys.puts('Usage: node fof.js (<username>) ([OPTION])');
    sys.puts('List <username>\'s Twitter fans, friends, or people he follows.');
    sys.puts('');
    sys.puts(' --fans         get people who follow <username>, but are not followed back');
    sys.puts(' --following    get people who are followed by <username>, but don\'t follow back');
    sys.puts(' --friends      get people who are followed by <username>, and follow back');
    sys.puts(' --help         display this help and exit');
    sys.puts('');
    sys.puts('If no OPTION is specified, the --following option is used.');
}
