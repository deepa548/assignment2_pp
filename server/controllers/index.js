//FileName: index.js
//Path: Controllers/index.js
//created by Deepa k
// student id :301250548
//30th September

// IMPORTANT: THIS IS A CONTROLLER INDEX FILE //

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//Create User Model instance
let userModel = require('../models/user');
let User = userModel.User; //Alias

/* Home page Controller*/
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName: ''});
}

/* Home page Controller */
module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { title: 'About Me', displayName: req.user ? req.user.displayName: ''});
}

/* Projects page Controller */
module.exports.displayProjectsPage = (req, res, next) => {
    res.render('index', { title: 'Projects', displayName: req.user ? req.user.displayName: ''});
}

/* Services page Controller */
module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', { title: 'Services', displayName: req.user ? req.user.displayName: ''});
}

/* Contact Me page Controller */
module.exports.displayContactMePage = (req, res, next) => {
    res.render('index', { title: 'Contact Me', displayName: req.user ? req.user.displayName: ''});
}

/*Controller Display Login page - Auth Operation */
module.exports.dsplayLoginPage = (req, res, next) => {
    //Check if the user is already loged-in
    if(!req.user){
        res.render('auth/login',
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    }
    else{
        return res.redirect('/');
    }
}

/*Controller Process Login page - Auth Operation */
module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
      //server error
      if(err){
        return next(err);
      }  

      // is there a user login error?
      if(!user){
        req.flash('loginMessage', 'Authentication Failed');
        return res.redirect('/login');
      }

      req.login(user,(err) =>{
        
        // If server error
        if(err){
            return next(err);
        }
        return res.redirect('/contact-list');
      });
    })(req, res, next);
}

/*Controller Process Registration - Auth Operation */
module.exports.dsplayRegistrationPage = (req, res, next) => {
    //Check if the user is already loged-in
    if(!req.user){
        res.render('auth/register',
        {
            title: "Register",
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    }
    else{
        return res.redirect('/');
    }
}

/*Controller Process Login page - Auth Operation */
module.exports.processRegisterPage = (req, res, next) => {
    let newUser = new User(
        {
            username: req.body.username,
            email: req.body.email,
            displayName: req.body.displayName
        }
    );

    User.register(newUser, req.body.password, (err) => {
        if(err){
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError"){
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exisists!'
                );
                console.log('Error: User Already Exisists!')
            }
            return res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.User ? req.User.displayName : ''
            });
        }
        else {
            //If no user exists, Then register
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/contact-list')
            });
        }
    });
}

/*Controller User Logout Operation */
module.exports.performLogout = (req, res, next) => {
    //Logout
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}