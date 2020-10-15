
module.exports = function (app) {
    const Views= require('../Controllers/Views.controller')
    app.route('/Dashboard')
        .get(Views._ViewFilm)
};