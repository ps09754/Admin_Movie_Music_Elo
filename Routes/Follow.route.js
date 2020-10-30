
module.exports = function (app) {
    const Follow = require('../Controllers/Follows.controller')
   app.route('/v1/follow/create')
        .post(Follow._addFollow)
    app.route('/v5/follow/delete/:user_id/:movie_id')
        .get(Follow._deleteFollow)
    app.route('/v3/follow/get/:user_id')
        .get(Follow._findFollowUser)
};