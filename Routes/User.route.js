const { request } = require('express');

module.exports = function (app) {
    const User = require('../Controllers/User.controller')
   app.route('/api/user/login/google')
        .post(User._addUser_by_google)
    app.route('/api/user/getUser/:id')
        .get(User._getDataUser_by_id)
};