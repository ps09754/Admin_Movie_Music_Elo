const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

module.exports = function (app) {
  var API_FILM = require("../Controllers/Api_Film.controller");

  app.route("/api/film/getbycast/:cast").get(API_FILM.getFilmsbyCast);

  app
    .route("/api/film/getbycategory/:Category")
    .get(API_FILM.getFilmsbyCategory);

  app
    .route("/api/film/getfilmsortcreateDate")
    .get(API_FILM.getFilmsbyCreateDate);

  app
    .route("/api/film/getfilmsortupdateDate")
    .get(API_FILM.getFilmsbyUpdateDate);

  app.route("/api/cast/getCastMaxViews").get(API_FILM.getCastWithMaxView);

  app.route("/api/film/getFilmById/:id").get(API_FILM.getFilmsById);

  app
    .route("/api/film/getCategoryByMovieId/:movieId")
    .get(API_FILM.getCategoryByFilmId);

  app
    .route("/api/episode/getEpisodeByMovieId/:movieId")
    .get(API_FILM.getEpisodesByMovieId);

  app
    .route("/api/episode/getViewByMovieId/:movieId")
    .get(API_FILM.getViewByMovieId);

  app.post("/api/user/signup", jsonParser, API_FILM.signupWithGuest);
};
