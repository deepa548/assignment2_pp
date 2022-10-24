let mongoose =require('mongoose');


//creating a model class

let contactModel = mongoose.Schema({

    name:String,
    contactNumber:String,
    email:String
},
{
    collection:"contact"
});

module.exports = mongoose.model('Contact', contactModel);
