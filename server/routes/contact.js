let express = require('express');
let router = express.Router();
let momgoose = require('mongoose');

//Auth requirements

let passport = require('passport');

// helper funciton for gurad purposes

function requireAuth(req, res, next){
    //check if the user logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}


//connecting to Controller

let contactlistController = require('../controllers/contact');

/* GET Route for the contact List page - READ Operation */
router.get('/', requireAuth, contactlistController.displayContactList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', requireAuth, contactlistController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', requireAuth, contactlistController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', requireAuth, contactlistController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', requireAuth, contactlistController.processEditPage);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', requireAuth, contactlistController.performDelete);

module.exports = router;