showUsage = require('./lib/help').showUsage
caseInsensitiveCompare = require('./lib/sort').caseInsensitiveCompare
Options = require('./lib/argument_parser').Options
ArgumentParser = require('./lib/argument_parser').ArgumentParser
Twitter = require('./lib/twitter').Twitter
Strategies = require('./lib/strategies')

success = (screenName, option) ->
  strategy = switch option
    when Options.FOLLOWING then Strategies.NotFollowingBackStrategy
    when Options.FANS then Strategies.FanStrategy
    when Options.FRIENDS then Strategies.FriendStrategy
  
  twitter = new Twitter(screenName)
  twitter.getUsernames(strategy, (usernames) ->
    usernames.sort(caseInsensitiveCompare)
    console.log(username) for username in usernames
  )

help = ->
  showUsage()

unknown = ->
  console.log('Unknown parameter')
  console.log('')
  showUsage()
  process.exit(1)

ArgumentParser.parse(process.argv, success, help, unknown)
