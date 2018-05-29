const express = require('express');
const expressJWT = require('express-jwt');
const config = require('./config');
const app = express();
const port = process.env.PORT || 8080;

app.use('/', express.static('./assets'));

// app.use(expressJWT({
//     secret: config.secretkey
// }).unless({
//     path: ['/login', '/register']
// }));
//
// app.use((err, req, res, next) => {
//     if(err.name === 'UnauthorizedError') {
//         res.status(401).json({
//             "msg": "Niet geautoriseerd (geen valid token)",
//             "code": 401
//         });
//         return;
//     }
//     next();
// });

app.use('/', require('./routes/routes'));

app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

module.exports = app;