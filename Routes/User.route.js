const { request } = require('express');

module.exports = function (app) {
    const User = require('../Controllers/User.controller')
   app.route('/api/v1/user/login')
        .post(User._addUser)
    app.route('/api/v2/user/getUser/:id')
        .get(User._getDataUser_by_id)
};