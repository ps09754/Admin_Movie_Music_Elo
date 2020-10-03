const { request } = require('express');

module.exports = function (app) {
    const User = require('../Controllers/User.controller')
    app.route('/v1/user/login')
        .post(User._addUser)
    
    app.route('/v3/user/getUser/:id')
        .get(User._getDataUser_by_id)
};