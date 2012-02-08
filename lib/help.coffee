showUsage = ->
  console.log('Usage: node fof.js (<username>) ([OPTION])')
  console.log('List <username>\'s Twitter fans, friends, or people he follows.')
  console.log('')
  console.log(' --fans         get people who follow <username>, but are not followed back')
  console.log(' --following    get people who are followed by <username>, but don\'t follow back')
  console.log(' --friends      get people who are followed by <username>, and follow back')
  console.log(' --help         display this help and exit')
  console.log('')
  console.log('If no OPTION is specified, the --following option is used.')

exports.showUsage = showUsage
