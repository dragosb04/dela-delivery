#!/usr/bin/env node

import app from '../src/app.js';
import http from 'http';
import debugLib from 'debug';
import config from '../src/config/config.js';

const debug = debugLib('backend:server');

// normalize port
function normalizePort(val: string | number): number | string | false {
    const port = typeof val === 'string' ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
}

const port = normalizePort(config.port);
app.set('port', port);

// create HTTP server
const server = http.createServer(app);

// listen on provided port
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error: NodeJS.ErrnoException) {
    if (error.syscall !== 'listen') throw error;

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

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

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
    debug('Listening on ' + bind);
    console.log(`Server running on ${bind}`);
}
