const Category = require('../Models/Category');
const Category_Movie = require('../Models/Category_Movie')
const Video = require('../Models/Video');
const Movie = require('../Models/Movie')
const Cast = require('../Models/Cast')
const Cast_Movie = require('../Models/Cast_Movie')
const moment = require('moment');

// add movie by body

exports._addMoviePostBody = (req, res) => {
    console.log(req.body.name + 'abc');
    var { name, directer, screenwriter, country, language, years, duration, introduction, cover_img, trailer } = req.body
    let movie_new = new Movie({
        name: name,
        directer: directer,
        status: '0/??',
        create_at: moment(new Date()).format('YYYY-MM-DD HH:mm'),
        update_at: null,
        delete_at: null,
        screenwriter: screenwriter,
        country: country,
        language: language,
        years: years,
        duration: duration,
        episode: 0,
        score: 0,
        introduction: introduction,
        cover_img: cover_img,
        trailer: trailer
    })
    movie_new.save(error => {
        if (error) {
            res.render('truyen', { data: db, gata: gb });
            res.json({
                result: false,
                message: error.message,
                status: 'Error add Movie'
            });
        } else {

            res.json({
                result: true,
                message: 'result ok movie',
                movie: movie_new,
            });

        }
    })

}

// get Movie by id
exports._getMovieByID = (req, res) => {
    new Promise((resolve, reject) => {
        Movie.findById({ _id: req.params._id }, function (err, data) {
            if (err) {
                res.json({
                    result: false,
                    message: err.message,
                    items: []
                });
                reject(err)
            } else {
                res.json({
                    result: true,
                    message: 'result ok',
                    items: data
                });
                resolve(data)
            }
        })
    })
}

// get detail film by movie_id
exports._getMovie_detail_byID = async (req, res) => {
    await Category_Movie.find({ 'movie_id': req.params.movie_id }).populate('category_id')
        .exec(function (err, data) {
            console.log(data);
            if (err) {
                res.json({
                    result: false,
                    message: 'get Category fail ! ' + err.message,
                    items: []
                });
            } else {
                Cast_Movie.find({ 'movie_id': req.params.movie_id }).populate('cast_id')
                    .exec(function (err1, cast) {
                        if (err1) {
                            res.json({
                                result: false,
                                message: 'get cast fail ! ' + err.message,
                                items: []
                            });
                        } else {
                            Movie.find({ _id: req.params.movie_id }, function (error, movie) {
                                if (error) {
                                    res.json({
                                        result: false,
                                        message: 'get movie fail ' + error.message,
                                        items: []
                                    });
                                } else {
                                    res.json({
                                        result: true,
                                        message: 'result ok',
                                        category: data.map((element, index) => {
                                            return { index: index, name: element.category_id.name, category_id: element.category_id._id }
                                        }),
                                        movie: movie,
                                        cast: cast.map((e, idx) => {
                                            return { index: idx, name: e.cast_id.name, cover_img: e.cast_id.cover_image, _id: e.cast_id._id }
                                        })
                                    });
                                }
                            })
                        }
                    })

            }
        })

}

// get movie by category_id
exports._getMovie_by_categoryID = (req, res) => {
    Category_Movie.find({ category_id: req.params.category_id }).populate('movie_id')
        .exec(function (err, data) {
            if (err) {
                res.json({
                    result: false,
                    message: 'get movie by category_id fail ! ' + err.message,
                    items: []
                });
            } else {
                res.json({
                    result: true,
                    message: 'get Category_id ok ! ',
                    items: data
                });
            }
        })
}

// get all movie

exports._getAllMovie = async (req, res) => {
    Movie.find({}, function (err, data) {
        if (err) {
            res.json({
                result: false,
                message: 'get all movie fail ! ' + err.message,
                items: []
            });
        } else {
            res.json({
                result: true,
                message: 'get all movie ok!',
                items: data
            })
        }
    })
}
// update
exports._updateMovie = async (req, res) => {
    await Movie.updateOne({ _id: req.params._id }, {
        name: req.body.name,
        directer: req.body.directer,
        status: req.body.status,
        update_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        screenwriter: req.body.screenwriter,
        country: req.body.country,
        language: req.body.language,
        years: req.body.years,
        duration: req.body.duration,
        episode: req.body.episode,
        score: req.body.score,
        introduction: req.body.introduction,
        cover_img: req.body.cover_img
    }, function (err) {
        if (err) {
            res.json({
                result: false,
                message: 'update movie fail : ' + err.message,

            });
        } else {
            res.json({
                result: true,
                message: 'update movie ok!'
            });
        }
    })
}

// get movie by new Create_at
exports._getMovieByCreate_at = async (req, res) => {
    await Movie.find({}, function (err, data) {
        if (err) {
            res.json({
                result: false,
                message: 'get movie sort create_at fail : ' + err.message,
            });
        } else {
            res.json({
                result: true,
                message: 'get movie sort create ok!',
                items: data
            });
        }
    }).sort({ 'create_at': -1 })
}

// delete
exports._deleteMovie = async (req, res) => {
    await Movie.updateOne({ _id: req.params._id }, {
        delete_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }, function (err) {
        if (err) {
            res.json({
                result: false,
                message: 'delete movie fail : ' + err.message,
            });
        } else {
            res.json({
                result: true,
                message: 'delete movie ok ',
            });
        }
    })
}

// api set score movie
exports._setScore = async (req, res) => {
    await Movie.find({ _id: req.params._id }, function (err, data) {
        if (err) {
            res.json({
                result: false,
                message: 'get movie set score fail : ' + err.message,
            });
        } else {
            console.log(data);
            Movie.updateOne({ _id: req.params._id }, {
                score: data[0].score + 1
            }, function (err1) {
                if (err1) {
                    res.json({
                        result: false,
                        message: 'set score movie fail : ' + err1.message,
                    });
                } else {
                    res.json({
                        result: true,
                        message: 'set score movie ok ',
                    });
                }
            })
        }
    })
}

exports._search = async (req, res) => {

    var regex = new RegExp([`.*${req.params.text}.*`].join(""), "i");

    Cast.find({ "name": regex }).exec(function(e,cast){
        if (e) {
            res.json({
                result: false,
                message: 'search movie faill ' + e.message
            })
        } else {
            Movie.find({ "name": regex }).exec(function (err, data) {
                if (err) {
                    res.json({
                        result: false,
                        message: 'search movie faill ' + err.message
                    })
                } else {
                    res.json({
                        result: true,
                        message: 'ok co data',
                        movie: data,
                        cast:cast
                    })
                }
            })
        
        }
    })




}