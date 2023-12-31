var createError = require('http-errors');
var express = require('express');
var path = require('path');
var flash = require('express-flash');
var session = require('express-session');
var mysql = require('mysql');
const config = require("config");
var connection = require('./lib/db');
var logger = require('./lib/logger');
var port = config.get("port");
var api = "/api/v1/";


var usersRouter = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public/')));

app.use(session({
  cookie: { maxAge: 60000 },
  store: new session.MemoryStore,
  saveUninitialized: true,
  resave: 'true',
  secret: 'secret'
}))

app.use(flash());
app.get(api, function (req, res, next) {
  logger.info("In get home page");
  res.render('index', { message: "success" });
});
app.use(api + '/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.render("404",{})
 // next(createError(404));
});

app.listen(port, () => {
  logger.info("RESTful API server started on : " + port);
});
