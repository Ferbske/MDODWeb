const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

let urlencodedParser = bodyParser.urlencoded({extended:false});

// Endpoint for login page
router.get('/', (req, res) => {
   res.render('../views/login.ejs')
});

// Endpoint for registration
router.get('/registration', (req, res) => {
    res.render('../views/register.ejs');
});

router.get('/dashboard', (req, res) => {
    res.render('../views/VoorbeeldHeaderFooter.ejs')
});

module.exports = router;