
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
 * Umami analytics proxy — serves script and forwards tracking payloads
 * through this server so ad blockers targeting cloud.umami.is don't fire.
 */
const UMAMI_HOST = 'https://cloud.umami.is';

app.get('/stats/script.js', async (req, res) => {
    try {
        const upstream = await fetch(`${UMAMI_HOST}/script.js`);
        const text = await upstream.text();
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.send(text);
    } catch {
        res.status(502).end();
    }
});

app.post('/stats/api/send', express.json(), async (req, res) => {
    try {
        const upstream = await fetch(`${UMAMI_HOST}/api/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': req.headers['user-agent'] || '',
                'X-Forwarded-For': req.ip,
            },
            body: JSON.stringify(req.body),
        });
        const data = await upstream.text();
        res.status(upstream.status).send(data);
    } catch {
        res.status(502).end();
    }
});


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
