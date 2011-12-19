var Options = require('./lib/option_parser').Options,
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
    case Options.INVALID_OPTION:   console.log('Invalid option');
                                   console.log('');
                                   showUsage();
                                   process.exit(1);
}

function showUsage() {
    console.log('Usage: node fof.js (<username>) ([OPTION])');
    console.log('List <username>\'s Twitter fans, friends, or people he follows.');
    console.log('');
    console.log(' --fans         get people who follow <username>, but are not followed back');
    console.log(' --following    get people who are followed by <username>, but don\'t follow back');
    console.log(' --friends      get people who are followed by <username>, and follow back');
    console.log(' --help         display this help and exit');
    console.log('');
    console.log('If no OPTION is specified, the --following option is used.');
}
