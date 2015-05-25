var fs = require('fs');

/*
 * GET home page.
 */
exports.index = function(req, res) {
    var model = {
        year : new Date().getFullYear(),
        sources : null
    };

    // Load sources for more reading
    fs.readFile(process.cwd() + '/sources.json', function(err, sources) {
        sources = JSON.parse(sources);
        model.sources = sources;
        res.render('index', model);  
    });  
};