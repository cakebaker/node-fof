class Options
  @FOLLOWING = 1
  @FANS = 2
  @FRIENDS = 4

exports.Options = Options

class ArgumentParser
  @parse: (args, success, help, unknown) ->
    return help() if args.length < 3 or args[2] is '--help'
    
    username = args[2]

    if args.length is 3
      # no option specified, use default option
      option = Options.FOLLOWING
    else
      option = switch args[3]
        when '--following' then Options.FOLLOWING
        when '--fans' then Options.FANS
        when '--friends' then Options.FRIENDS

    if option? then success(username, option) else unknown()

exports.ArgumentParser = ArgumentParser
