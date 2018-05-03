'use strict';

import express from 'express';
import path from 'path';
import http from 'http';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import logger from 'morgan';
var debug = require('debug')('node-frame1-b:server');

// data base & routers
import db from './mongodb/db.js';
import router from './routes/index.js';

const app = express();

// allow cross domain
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("X-Powered-By", '3.2.1');
    if (req.method == 'OPTIONS') {
        res.send(200)
    } else {
        next()
    }
});


// view engine setup
// if want to use, remove annotations please
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));

// router
router(app);

// static source
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
    res.sendFile('./public/index.html')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// port & listen
const server = http.createServer(app);
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// normalize a port into a number, string, or false
function normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false
}
// event listener for HTTP server "error" event
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error
    }
    let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    // handle specific listen errors with friendly messages
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
// event listener for HTTP server "listening" event
function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

module.exports = app