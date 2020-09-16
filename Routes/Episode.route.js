module.exports = function (app) {
  var Episode = require("../Controllers/Episode.controller");
  app.route("/addEpisode").get(Episode.addEpisode);
};
