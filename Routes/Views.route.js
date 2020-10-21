module.exports = function (app) {
  const Views = require("../Controllers/Views.controller");
  app.route("/Dashboard").get(Views._ViewFilm);

  app.route("/Movie_add").get(Views._AddFilm);
};
