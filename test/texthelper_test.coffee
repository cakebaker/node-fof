assert = require('assert')
nicePeople = require('../lib/texthelper').nicePeople

describe "nicePeople", ->
  it "returns 'No people' if there are no people", ->
    assert.equal(nicePeople(0), "No people")

  it "returns 'One person' if there is one person", ->
    assert.equal(nicePeople(1), "One person")

  it "returns 'x people' if there are two or more people", ->
    assert.equal(nicePeople(2), "2 people")
