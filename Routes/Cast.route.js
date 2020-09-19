const { request } = require('express');

module.exports = function (app) {
    const Cast = require('../Controllers/Cast.controller')
   app.route('/api/cast/add')
        .post(Cast._addCast)
  
    app.route('/api/cast/get/:id')
        .get(Cast._getCast_by_id)
};