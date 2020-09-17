module.exports = function (app) {
    const Category_Movie = require('../Controllers/Category_Movie.controller');
    app.route('/api/category_movie/add')
        .get(Category_Movie._addCategory_Movie)// add data gắn sẵn
        .post(Category_Movie._addCategory_Movie_Post_body)// add vs post body
    app.route('/api/category_movie/add/:status/:category_id/:movie_id')
        .post(Category_Movie._addCategory_Movie_Post_params) // add vs post params
 };