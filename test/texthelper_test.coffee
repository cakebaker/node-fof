require('should')
nicePeople = require('../lib/texthelper').nicePeople

describe "nicePeople", ->
  it "returns 'No people' if there are no people", ->
    nicePeople(0).should.equal('No people')

  it "returns 'One person' if there is one person", ->
    nicePeople(1).should.equal('One person')

  it "returns 'x people' if there are two or more people", ->
    nicePeople(2).should.equal('2 people')
