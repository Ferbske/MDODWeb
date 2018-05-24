const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

let urlencodedParser = bodyParser.urlencoded({extended:false});

router.get('/', (req, res) => {
   res.render("../views/login.ejs");
});

module.exports = router;