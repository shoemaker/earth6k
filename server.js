
/**
 * Module dependencies.
 */

const express = require('express');
const compression = require('compression');
const path = require('path');
const routes = require('./routes');
const { config: c } = require('./config');

const app = express();

app.set('port', process.env.PORT || c.appPort);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Define routes.
 */
app.get('/', routes.index);


/**
 * Fire up the server.
 */
app.listen(app.get('port'), () => {
    console.log(`Server running at http://localhost:${app.get('port')}`);
});
