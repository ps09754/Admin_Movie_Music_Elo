const { request } = require('express');

module.exports = function (app) {
    const User = require('../Controllers/User.controller')
    app.route('/v1/user/login/:type')
        .post(User._addUser)
    
    app.route('/v3/user/getUser/:id')
        .get(User._getDataUser_by_id)

    app.route('/v4/user/async/:_id/:type')
        .put(User._asyncUser)
};