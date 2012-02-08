require('should')
Strategies = require('../lib/strategies')

describe "FanStrategy", ->
  describe "::execute", ->
    it "returns an empty array if there are no followers", ->
      friends = [1, 2]
      followers = []
      fans = Strategies.FanStrategy.execute(friends, followers)
      fans.should.be.empty

    it "returns all followers as fans if there are no friends", ->
      friends = []
      followers = [1, 2]
      fans = Strategies.FanStrategy.execute(friends, followers)
      fans.should.eql(followers)

    it "returns all followers as fans which are not friends", ->
      friends = [2, 3]
      followers = [1, 2, 3, 4]
      fans = Strategies.FanStrategy.execute(friends, followers)
      fans.should.eql([1, 4])

describe "FriendStrategy", ->
  describe "::execute", ->
    it "returns an empty array if there are no followers", ->
      friends = [1, 2]
      followers = []
      trueFriends = Strategies.FriendStrategy.execute(friends, followers)
      trueFriends.should.be.empty

    it "returns an empty array if there are no friends", ->
      friends = []
      followers = [1, 2]
      trueFriends = Strategies.FriendStrategy.execute(friends, followers)
      trueFriends.should.be.empty

    it "returns all 'true' friends which are both friends and followers", ->
      friends = [1, 2, 3]
      followers = [2, 3, 4]
      trueFriends = Strategies.FriendStrategy.execute(friends, followers)
      trueFriends.should.eql([2, 3])

describe "NotFollowingBackStrategy", ->
  describe "::execute", ->
    it "returns all friends if there are no followers", ->
      friends = [1, 2]
      followers = []
      notFollowingBack = Strategies.NotFollowingBackStrategy.execute(friends, followers)
      notFollowingBack.should.eql(friends)

    it "returns an empty array if there are no friends", ->
      friends = []
      followers = [1, 2]
      notFollowingBack = Strategies.NotFollowingBackStrategy.execute(friends, followers)
      notFollowingBack.should.be.empty

    it "returns all friends which are not followers", ->
      friends = [1, 2, 3]
      followers = [2, 3, 4]
      notFollowingBack = Strategies.NotFollowingBackStrategy.execute(friends, followers)
      notFollowingBack.should.eql([1])
