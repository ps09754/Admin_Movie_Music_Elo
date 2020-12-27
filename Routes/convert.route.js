module.exports = function (app,key) {
    const API = require("../Controllers/Convert.api");
    // CREATE
   app.route(`/convert/link/youtube`).get(API._ConvertLink)
  };
  