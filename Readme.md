node-fof is a simple CLI tool to list a Twitter user's fans, friends, or the people who don't follow back. Its functionality is inspired by friendorfollow.com. 

node-fof started as a project to learn node.js. Later, I rewrote it with CoffeeScript for learning purposes.


Usage: coffee fof (<username>) ([OPTION])

 --fans         get people who follow <username>, but are not followed back
 --following    get people who are followed by <username>, but don't follow back
 --friends      get people who are followed by <username>, and follow back
 --help         display this help and exit

If no OPTION is specified, the --following option is used.
