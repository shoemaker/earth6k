const fs = require('fs');

// Load once at startup rather than on every request
const sources = JSON.parse(fs.readFileSync('./sources.json', 'utf8'));

/*
 * GET home page.
 */
exports.index = function(req, res) {
    res.render('index', {
        year: new Date().getFullYear(),
        sources
    });
};
