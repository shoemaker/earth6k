
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { year: new Date().getFullYear() });
};