let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Contact = require('../models/contact');


/* Controller Contact List page - READ Operation */
module.exports.displayContactList = (req, res, next) => {
  Contact.find((err, contactlist) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
          res.render('contacts/contactlist', 
          {title: 'Contact List', Contactlist:contactlist, displayName: req.user ? req.user.displayName: ''});  // render contactlist.ejs and pass title and Contactlist variable    
        }
    });
}


/* Controller displaying the Add page - CREATE Operation */

module.exports.displayAddPage = (req, res, next) => {
    res.render("contacts/add", { title: "Add Contact"});       
}


/* Processing the Add page - CREATE Operation */

module.exports.processAddPage = (req, res, next) => {
    let newcontact = Contact({
      "name":req.body.name,
      "contactNumber":req.body.contactNumber,
      "email":req.body.email
    });
    Contact.create(newcontact, (err, Contact) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        //refresh the contact-list
        res.redirect("/contact-list");
      }
    });
  }


/* Displaying the Edit page - UPDATE Operation */

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Contact.findById(id, (err, contactlisttoedit) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          //show the edit view
          res.render("contacts/edit", { title: "Edit Contact", contact: contactlisttoedit, displayName: req.user ? req.user.displayName: '' });
        }
      });
}

/* Processing the Edit page - UPDATE Operation */

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatecontact = Contact({
        "_id": id,
        "name":req.body.name,
        "contactNumber":req.body.contactNumber,
        "email":req.body.email
      });
      Contact.updateOne({ _id: id }, updatecontact, (err) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          //refresh the contact list
          res.redirect("/contact-list");
        }
      });
}


/* Perform  Deletion - DELETE Operation */

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Contact.remove({ _id: id }, (err) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          //refresh contact list
          res.redirect("/contact-list");
        }
      });
}