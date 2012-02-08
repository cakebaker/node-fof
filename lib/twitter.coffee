http = require('http')
util = require('util')

class Twitter
  twitterClient = null

  constructor: (@screenName) ->
    twitterClient = http.createClient(80, 'api.twitter.com')

  getUsernames: (strategy, callback) ->
    items = ['friends', 'followers']
    results = {}

    for item in items
      @getIds(item, (type, result) =>
        results[type] = result

        if results.friends? and results.followers?
          wantedIds = strategy.execute(results.friends, results.followers)
          @lookupUsers(wantedIds, callback)
      )

  lookupUsers: (userIds, callback) ->
    request = twitterClient.request('GET', "/1/users/lookup.json?user_id=#{userIds.join()}", {'host': 'api.twitter.com'})

    request.addListener('response', (response) ->
      data = ''

      response.addListener('data', (chunk) ->
        data += chunk
      )

      response.addListener('end', ->
        if (response.statusCode is 200)
          usernames = []
          users = JSON.parse(data)
          usernames.push(user.screen_name) for user in users
          callback(usernames)
      )
    )

    request.end()

  getIds: (type, callback) ->
    cursor = -1
    request = twitterClient.request('GET', "/1/#{type}/ids.json?screen_name=#{@screenName}&cursor=#{cursor}", {'host': 'api.twitter.com'})

    request.addListener('response', (response) ->
      data = ''

      response.addListener('data', (chunk) ->
        data += chunk
      )

      response.addListener('end', ->
        if (response.statusCode is 200)
          result = JSON.parse(data)
          callback(type, result.ids)
        else
          console.log("An error occured: #{response.statusCode}")
          process.exit(1)
      )
    )

    request.end()

exports.Twitter = Twitter
