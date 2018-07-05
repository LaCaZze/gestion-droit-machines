var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/parc')
  .then(() => console.log('connection succesful'))


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


//
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);


// // Require Mongoose et connection à la bdd
// //mongoose.connect("mongodb://localhost/planning")
// mongoose.connect(urlRemote)
//     .then (() => console.log('Connexion BDD OK'));

var db = mongoose.connection;
//




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// // utilisation des sessions
// app.use(session({
//   // secret concat avec le password pour + de sécuriter
//   secret: 'work hard',
//   resave: true,
//   saveUninitialized: false,
//   store: new MongoStore({
//       mongooseConnection: db
//   })
// }));

//routes user
var users = require("./routes/users");
app.use("/users", users);

//routes machines
var machines = require("./routes/machines");
app.use("/machines", machines);

//routes utilisateurs
var utilisateurs = require("./routes/utilisateurs");
app.use("/utilisateurs", utilisateurs);

//routes droits
var droits = require("./routes/droits");
app.use("/droits", droits);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
