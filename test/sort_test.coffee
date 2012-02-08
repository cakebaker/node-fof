require('should')
caseInsensitiveCompare = require('../lib/sort').caseInsensitiveCompare

describe "caseInsensitiveSort", ->
  it "returns 0 if the values are the same", ->
    caseInsensitiveCompare('a', 'a').should.equal(0)
    caseInsensitiveCompare('a', 'A').should.equal(0)
    caseInsensitiveCompare('A', 'a').should.equal(0)
    caseInsensitiveCompare('A', 'A').should.equal(0)

  it "returns -1 if a is smaller than b", ->
    caseInsensitiveCompare('a', 'b').should.equal(-1)
    caseInsensitiveCompare('a', 'B').should.equal(-1)
    caseInsensitiveCompare('A', 'b').should.equal(-1)
    caseInsensitiveCompare('A', 'B').should.equal(-1)

  it "returns 1 if b is greater than a", ->
    caseInsensitiveCompare('b', 'a').should.equal(1)
    caseInsensitiveCompare('b', 'A').should.equal(1)
    caseInsensitiveCompare('B', 'a').should.equal(1)
    caseInsensitiveCompare('B', 'A').should.equal(1)
