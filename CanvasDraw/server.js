// Simple node server - CS22A
// The following function will be called whenever
// the server receives a request.
'use strict';
function servePage(request, response) {
  // headers for the MIME types supported by this server
  var headers = {
    '.html': {
      'Content-Type': 'text/html charset = UTF-8'
    },
    '.txt': {
      'Content-Type': 'text/plain; charset = UTF-8'
    },
    '.js': {
      'Content-Type': 'application/javascript; charset = UTF-8'
    },
    '.appcache': {
      'Content-Type': 'text/cache-manifest; charset = UTF-8',
      'Cache-Control': 'no-cache'
    },
    '.css': {
      'Content-Type': 'text/css; charset = UTF-8'
    },
    '.json': {
      'Content-Type': 'application/json; charset = UTF-8'
    },
    '.gif': {
      'Content-Type': 'image/gif'
    }
  }
  // Extract the filename and extension from the request.
 
  var filename = '.' + url.parse(request.url).pathname;
  // If the user does not enter a file name,
  // we serve the page home.html 
  if (filename === './') {
    filename = './html/home.html';
  }
  // Get the extension of the requested resource so we can determine the type
 
  var extension = path.extname(filename)
  var header = headers[extension]; //header for the extension    
  // Read the file asynchronously
  fs.readFile(filename, function (err, content) {
    if (err) { // If there is an error, set the status code 
      response.writeHead(404, {
        'Content-Type': 'text/plain; charset = UTF-8'
      });
      response.write(err.message); // Include the error message body
      response.write(' - The page requested is not found.');
      response.end(); // Done 
    } else { // Otherwise, the file was read successfully. 
      response.writeHead(200, header);
      response.write(content); // Send file contents as response body 
      response.end();
    }
  });
};
// load the url module
var url = require('url');
var path = require('path');
// Load the file system module
// Load the file system module
var fs = require('fs');
// load the http module
var http = require('http');
// create a server object
var server = http.createServer(servePage);
server.listen(8080);
console.log('Server running at http://localhost:8080');
 