// function say(word) {
//   console.log(word);
// }

// function execute(someFunction, value) {
//   someFunction(value);
// }

// execute(say, "Hello");

var http = require('http')
var url = require('url')
var router = require('./file/router')

function start (route) {
  function onRequest (request, response) {
    var pathname = url.parse(request.url).pathname
    console.log('Request for ' + pathname + ' received.')
    route(pathname)
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.write('Hello World')
    response.end()
  }

  http.createServer(onRequest).listen(8888)
  console.log('Server has started.')
}

start(router.route)
