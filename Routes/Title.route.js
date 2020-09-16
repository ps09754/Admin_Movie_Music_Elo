module.exports = function (app) {
    var Title = require('../Controllers/Title.controller');
    app.route('/addTitle')
        .get(Title.newTitle);
    app.route('/api/title/getTitlebycreateDate')    
        .get(Title.getTitlebycreateDate)
};