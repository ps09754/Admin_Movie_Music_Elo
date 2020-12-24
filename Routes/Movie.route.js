module.exports = function (app,key) {
    const Movie = require("../Controllers/Movie.controller");
    // CREATE
    app.route(`/movie/${key}/c1/create`).post(Movie._createMovie);
    app.route(`/movie/${key}/m1/add/category`).get(Movie._addCategory);
    
    // get category by movie /movie/AIzaSyDf9VpK_IrkpF6pa8U4v67mFWNcDy6aSAY/m3/find/category
    app.route(`/movie/${key}/m3/find/category`).get(Movie._findCategoryByMovie);
    // get movie by id
    app.route(`/movie/${key}/m3/find/id`).get(Movie._findMovieByID);
    
  };
  