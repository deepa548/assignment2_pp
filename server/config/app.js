//FileName: app.js
//created by Deepa k
// student id :301250548
//30th September

//installed third party packAGES

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');


//Modules for Auth
let session =  require('express-session');
let passport =  require('passport');
let passportlocal =  require('passport-local');
let localStrategy =  passportlocal.Strategy;
let flash =  require('connect-flash');

//setting up database
let mongoose = require('mongoose');
let DB = require('./db');

//pointing mongooose to DB URI
mongoose.connect(DB.URI);

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB');
});

let indexRouter = require('../routes/index'); // ROUTES 
let usersRouter = require('../routes/users');
let contactsRouter = require('../routes/contact');  // added a new router for new page contact


let app = express();  // CREATES AN INSTANCE OF APP

// view engine setup
// 
app.set('views', path.join(__dirname, '../views'));   
app.set('view engine', 'ejs');   // used  express -e to insatll ejs


app.use(logger('dev'));
app.use(express.json());  
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//Setup Express Session
app.use(session ({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false

}));

//Initialize Flash
app.use(flash());

//Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//Passport User Config

//Crate a User Model instance
let UserModel = require('../models/user');
let User = UserModel.User;

// Impliment a User Auth Strategy
passport.use(User.createStrategy());

// serialize and deserialize User Info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//static route- public folder which is available to everyone
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contact-list', contactsRouter);   // added contact list to app.use, calls book list from the contacts router

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
  res.render('error', { title: 'Error'});
});

module.exports = app;
