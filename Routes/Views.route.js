
module.exports = function (app) {
    const Views= require('../Controllers/Views.controller')
    app.route('/Film')
        .get(Views._ViewFilm)
};