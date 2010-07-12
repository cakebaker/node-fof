function Options() {
}

Options.HELP = 1;
Options.FOLLOWING = 2;
Options.FANS = 4;
Options.FRIENDS = 8;
Options.INVALID_OPTION = 16;

exports.Options = Options;


function OptionParser() {
}

OptionParser.parse = function() {
    if (process.argv.length < 3 || process.argv[2] == '--help') return Options.HELP;
    if (process.argv.length == 3) return Options.FOLLOWING;

    switch (process.argv[3]) {
        case '--following':   return Options.FOLLOWING;
        case '--fans':        return Options.FANS;
        case '--friends':     return Options.FRIENDS;
        default:              return Options.INVALID_OPTION;
    }
}

exports.OptionParser = OptionParser;
