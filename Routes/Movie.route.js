const { request } = require('express');

module.exports = function (app) {
    const Movie = require('../Controllers/Movie.controller')
   app.route('/api/movie/add')
        .get(Movie._addMovie) // add mặc định đã gắn dữ liệu
        .post(Movie._addMoviePostBody) //add post với data request body
    app.route('/api/movie/getbyid/:movie_id')
        .get(Movie._getMovieByID)// get phim by movie_id
    app.route('/api/movie/get_full_movie/:movie_id')
        .get(Movie._getMovie_detail_byID)// get full data phim by movie_id
    app.route('/api/movie/getMovieByCategoryId/:category_id')
        .get(Movie._getMovie_by_categoryID)// get data by category id
};