var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let session = require('express-session');
let passport = require('passport');
const pgSession = require('connect-pg-simple')(session);
const sessionPool = require('pg').Pool;
const CONST = require('./const');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var expenseRouter = require('./routes/expense');

var app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
  if ('OPTIONS' == req.method) {
       res.sendStatus(200);
   } else {
       next();
   }
  });

const sessionDBaccess = new sessionPool(CONST.dbPool);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  store: new pgSession({
    pool: sessionDBaccess,
    table: 'session'
  }),
  secret: 'randompassword',
  saveUninitialized: false,
  resave: false,
  cookie: { secure:false, httpOnly: true, path: '/'}
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
app.use('/', indexRouter); //localhost:3000/
app.use('/api/users', usersRouter); //localhost:3000/api/users
app.use('/api/expense', expenseRouter); //localhost:3000/api/expense

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

module.exports = app;
