module.exports = function (app) {
   const Category = require('../Controllers/Category.controller');
    app.route('/api/category/add')
        .get(Category._addCategory)
        .post(Category._addCategoryPostBody);
    app.route('/api/category/add/:name/:position/:status')
        .post(Category._addCategoryPostParams)
    
    app.route('/api/category/get/:category_id')
        .get(Category._getCategory_by_category_ID)
    app.route('/api/category/getAll')
        .get(Category._getAllCategory)
};