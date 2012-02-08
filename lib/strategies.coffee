class FanStrategy
  @execute: (friends, followers) ->
    arrayDiff(followers, friends)

exports.FanStrategy = FanStrategy

class FriendStrategy
  @execute: (friends, followers) ->
    friend for friend in friends when followers.indexOf(friend) > (-1)

exports.FriendStrategy = FriendStrategy

class NotFollowingBackStrategy
  @execute: (friends, followers) ->
    arrayDiff(friends, followers)

exports.NotFollowingBackStrategy = NotFollowingBackStrategy

arrayDiff = (array1, array2) ->
  element for element in array1 when array2.indexOf(element) is (-1)
