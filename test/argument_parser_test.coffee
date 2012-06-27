assert = require('assert')
Options = require('../lib/argument_parser').Options
ArgumentParser = require('../lib/argument_parser').ArgumentParser

describe "ArgumentParser", ->
  describe "::parse", ->
    args = null
    beforeEach ->
      # the first two params are always set by node.js
      args = ['node', 'scriptName']

    describe "arguments contain username", ->
      theUsername = 'myUsername'

      beforeEach ->
        args.push(theUsername)

      it "calls the success callback with the given username and the default option", ->
        ArgumentParser.parse(args, ((username, type) ->
          assert.equal(username, theUsername)
          assert.equal(type, Options.FOLLOWING)
        ), fail, fail)

      it "calls the success callback with the given username and the given option", ->
        options = ['--following', '--fans', '--friends']
        expectedOptions = [Options.FOLLOWING, Options.FANS, Options.FRIENDS]
        
        for option, index in options
          localArgs = args[0...args.length]
          localArgs.push(option)

          ArgumentParser.parse(localArgs, ((username, type) ->
            assert.equal(username, theUsername)
            assert.equal(type, expectedOptions[index])
          ), fail, fail)

      it "calls the unknown callback when an unknown argument is given", ->
        args.push('--invalid')
        ArgumentParser.parse(args, fail, fail, ->)

    it "calls the help callback when no arguments are given", ->
      ArgumentParser.parse(args, fail, (->), fail)

    it "calls the help callback when the help argument is given", ->
      args.push('--help')
      ArgumentParser.parse(args, fail, (->), fail)

fail = ->
  throw new Error('Invalid callback called')
