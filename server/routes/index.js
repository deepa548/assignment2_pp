//FileName: index.js
//Path: Routers/index.js
//created by Deepa k
// student id :301250548
//30th September

// IMPORTANT: THIS IS A ROUTER INDEX FILE //

let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET About Us page. */
router.get('/about', indexController.displayAboutPage);

/* GET Products page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact Us page. */
router.get('/contact', indexController.displayContactMePage);

/* GET Route for displaying the Login page - Auth Operation */
router.get('/login', indexController.dsplayLoginPage);

/* POST Route for processing the Login page - Auth Operation */
router.post('/login', indexController.processLoginPage);

/* GET Route for displaying the register page - Auth Operation */
router.get('/register', indexController.dsplayRegistrationPage);

/* POST Route for processing the register page - Auth Operation */
router.post('/register', indexController.processRegisterPage);

/* GET to Perform User Logout Operation */
router.get('/logout', indexController.performLogout);


module.exports = router;