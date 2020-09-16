module.exports = function (app) {
    var Cast = require('../Controllers/Cast.controller');
    app.route('/addCast')
        .get(Cast.addCast)
        
};