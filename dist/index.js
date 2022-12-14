#!/usr/bin/env node

/**
 * Module dependencies.
 */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

var _socket = _interopRequireDefault(require("socket.io"));

var _fs = _interopRequireDefault(require("fs"));

var _http = _interopRequireDefault(require("http"));

var _os = _interopRequireDefault(require("os"));

var _cluster = _interopRequireDefault(require("cluster"));

require("dotenv/config");

var _mongoose = _interopRequireDefault(require("mongoose"));

var debug = require('debug');

var server = _http["default"].createServer(
/*{
   key: fs.readFileSync('tajawal-ksa.com.key'),
   cert: fs.readFileSync('server.cert')
   },*/
_app["default"]);
/**
 * Get port from environment and store in Express.
 */


var port = normalizePort(process.env.PORT || '4000');

_app["default"].set('port', port);
/**
 * Create HTTP server.
 */

/**
 * Listen on provided port, on all network interfaces.
 */


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
/**
 * Event listener for HTTP server "error" event.
 */


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port; // handle specific listen errors with friendly messages

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;

    default:
      throw error;
  }
}
/**
 * Event listener for HTTP server "listening" event.
 */


function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
} //}