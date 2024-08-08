var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const passport = require("passport");
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { SessionStorage } = require('./lib/sessionStorage');
const { jwtAuth, localAuth } = require("./config/passport");
const flash = require("connect-flash");

var app = express();
app.engine(
  ".hbs",
  expressHandlebars.engine({
    defaultLayout: "main",
    extname: ".hbs",
    
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
      selected: function (option, value) {
        if (parseInt(option) === parseInt(value)) {
          return "selected";
        } else {
          return "";
        }
      },
      multiplyBy: function (valueOne, valueTwo) {
        return valueOne * valueTwo;
      },
      checkStatus: function (status) { },
      if_not: function (val1, val2, opts) {
        if (val1 !== val2) {
          return opts.fn(this);
        } else {
          return opts.inverse(this);
        }
      },
      hbsDate: function (value) {
        return formatDate(value)
      },
      addition: (val1, value2) => {
        return parseInt(val1) + parseInt(value2);
      },
      if_eq: function (val1, val2, opts) {
        if (val1 === val2) {
          return opts.fn(this);
        } else {
          return opts.inverse(this);
        }
      },
      formatJson: function (val) {
        return JSON.stringify(val)
      },
      lessThan: function (val1, val2, opts) {
        if (val1 < val2) {
          return opts.fn(this);
        } else {
          return opts.inverse(this);
        }
      },
    },
  }),
);
// view engine setup
app.set("view engine", ".hbs");
app.set("views", __dirname + "/views");
app.use(cookieParser());
app.use(
  session({
    secret: "~@##jkjdf145154#",
    resave: false,
    saveUninitialized: false,
    maxAge: 1000 * 60 * 60 * 24,

    /* store: new SqliteStore({
      client: sessionsDB,
    }), 
    store: sessionStore*/
    cookie: {
      secure: false, // Assurez-vous que votre site utilise HTTPS
      httpOnly: true,
      sameSite: 'strict', // Ou 'lax' selon vos besoins
      maxAge: 1000 * 60 * 60 * 24 // 24 heures
    },
    store: new SessionStorage()
  }),
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
jwtAuth(passport);
localAuth(passport);

// Global variables
app.use(async function (req, res, next) {
  res.locals.user = req.user || null;
  res.locals.messages = req.session.messages || [];
  req.session.messages = [];
  res.locals.error = req.flash("error") || null;
  //console.log(req.user)
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',require("./routes/auth/index"))
app.use('/api/boards',require("./routes/board"))
app.use('/api/tasks',require("./routes/card"))
app.use('/api/lists',require("./routes/list"))
app.use('/admin/personnel',require("./routes/personnel"))

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
