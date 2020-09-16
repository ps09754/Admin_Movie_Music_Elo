module.exports = function (app) {
    var Film = require('../Controllers/Film.controller');
    app.route('/addFilm')
        .get(Film.addFilm)
        
};