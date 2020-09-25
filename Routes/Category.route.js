module.exports = function (app) {
   const Category = require('../Controllers/Category.controller');
    app.route('/api/category/v1/add')
        .get(Category._addCategory)// add với dữ liệu gắn sẵn
        .post(Category._addCategoryPostBody);// add với post body
    app.route('/api/category/v2/add/:name/:position/:status')
        .post(Category._addCategoryPostParams)// add vs post parmas
    
    app.route('/api/category/get/:category_id')
        .get(Category._getCategory_by_category_ID)//get category by id
    app.route('/api/category/getAll')
        .get(Category._getAllCategory)// get all category
};