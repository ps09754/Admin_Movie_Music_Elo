module.exports = function (app) {
    var Category = require('../Controllers/Category.controller');
    app.route('/addCategory')
        .get(Category.addCategory)
        
};