class Options
  @FOLLOWING = 1
  @FANS = 2
  @FRIENDS = 4

exports.Options = Options

class ArgumentParser
  @parse: (arguments, success, help, unknown) ->
    return help() if arguments.length < 3 or arguments[2] is '--help'
    
    username = arguments[2]

    if arguments.length is 3
      # no option specified, use default option
      option = Options.FOLLOWING
    else
      option = switch arguments[3]
        when '--following' then Options.FOLLOWING
        when '--fans' then Options.FANS
        when '--friends' then Options.FRIENDS

    if option? then success(username, option) else unknown()

exports.ArgumentParser = ArgumentParser
