const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use('/', express.static('./assets'));
app.use('/', require('./routes/routes'));

app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});