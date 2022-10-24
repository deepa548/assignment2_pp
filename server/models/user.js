// Require module for User Model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema(

    {
     username:
     {
        type: String,
        default: '',
        trim: true,
        required: 'UserName is Required'
     },        
     /*password:
     {
        type: String,
        default: '',
        trim: true,
        required: 'Password is Required'
     },*/
     email:
     {
        type: String,
        default: '',
        trim: true,
        required: 'Email is Required'
     },
     displayName:
     {
        type: String,
        default: '',
        trim: true,
        required: 'Dept Name is Required'
     },
    created:
     {
        type: Date,
        default: Date.now,
     },
     updated:
     {
        type: Date,
        default: Date.now,
     }
    },
    {
        collection: "users"
    }
);

// Configure options for User Model

let options = (
    {
        missingPasswordError: 'Wrong / Missing Passowrd'
    }
);

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);