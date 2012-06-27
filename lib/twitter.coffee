http = require('http')
util = require('util')

class Twitter
  constructor: (@screenName) ->

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
    @makeGetRequest "/1/users/lookup.json?user_id=#{userIds.join()}", (data) ->
      usernames = []
      users = JSON.parse(data)
      usernames.push(user.screen_name) for user in users
      callback(usernames)

  getIds: (type, callback) ->
    cursor = -1
    @makeGetRequest "/1/#{type}/ids.json?screen_name=#{@screenName}&cursor=#{cursor}", (data) ->
      result = JSON.parse(data)
      callback(type, result.ids)

  makeGetRequest: (url, dataHandler) ->
    options = {
      host: 'api.twitter.com',
      path: url
    }
    request = http.request(options)

    request.addListener('response', (response) ->
      data = ''

      response.addListener('data', (chunk) ->
        data += chunk
      )

      response.addListener('end', ->
        if (response.statusCode is 200)
          dataHandler(data)
        else
          console.log("An error occured: #{response.statusCode}")
          process.exit(1)
      )
    )

    request.end()

exports.Twitter = Twitter
