const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

let urlencodedParser = bodyParser.urlencoded({extended:false});

// Endpoint for login page
router.get('/login', (req, res) => {
   res.render('../views/login.ejs')
});

// Endpoint for registration
router.get('/register', (req, res) => {
    res.render('../views/register.ejs');
});

// Endpoints for the dashboard after login
router.get('/dashboard', (req, res) => {
    res.render('../views/VoorbeeldHeaderFooter.ejs')
});

// Endpoint thats needed for adding the header in pages
router.get('/views/header', (req, res) => {
    res.render('../views/header.ejs')
});

// Endpoint thats needed for adding the footer in pages
router.get('/views/footer', (req, res) => {
    res.render('../views/footer.ejs')
});

module.exports = router;