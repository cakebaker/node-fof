assert = require('assert')
caseInsensitiveCompare = require('../lib/sort').caseInsensitiveCompare

describe "caseInsensitiveSort", ->
  it "returns 0 if the values are the same", ->
    assert.equal(caseInsensitiveCompare('a', 'a'), 0)
    assert.equal(caseInsensitiveCompare('a', 'A'), 0)
    assert.equal(caseInsensitiveCompare('A', 'a'), 0)
    assert.equal(caseInsensitiveCompare('A', 'A'), 0)

  it "returns -1 if a is smaller than b", ->
    assert.equal(caseInsensitiveCompare('a', 'b'), -1)
    assert.equal(caseInsensitiveCompare('a', 'B'), -1)
    assert.equal(caseInsensitiveCompare('A', 'b'), -1)
    assert.equal(caseInsensitiveCompare('A', 'B'), -1)

  it "returns 1 if b is greater than a", ->
    assert.equal(caseInsensitiveCompare('b', 'a'), 1)
    assert.equal(caseInsensitiveCompare('b', 'A'), 1)
    assert.equal(caseInsensitiveCompare('B', 'a'), 1)
    assert.equal(caseInsensitiveCompare('B', 'A'), 1)
