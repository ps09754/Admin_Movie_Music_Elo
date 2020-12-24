const Movie = require('../Models/Movie')
const Category = require('../Models/Category')
const Category_Movie = require('../Models/Category_Movie')
const moment = require('moment')



exports._createMovie = async (req, res) => {
    const { title, title_EN, keyword, trailer } = req.body
    const { publishTime, nation, duration, language, production_company, total_episodes } = req.body
    const { medium, high } = req.body
    if (!title) {
        res.json({
            error: {
                code: 404,
                err: 'Title',
                message: 'Title của bộ phim đang được để trống, vui lòng xem lại !',
                reason: 'không tìm thấy nội dung yêu cầu , có thể bạn đang để trống phần title của bộ phim',
            }
        })
        res.end()
    } else if (!trailer) {
        res.json({
            error: {
                code: 404,
                err: 'Trailer',
                message: 'Trailer của bộ phim đang được để trống, vui lòng xem lại !',
                reason: 'không tìm thấy nội dung yêu cầu , có thể bạn đang để trống phần Trailer của bộ phim',
            }
        })
        res.end()
    } else if (!medium && !high) {
        res.json({
            error: {
                code: 404,
                err: 'Medium & High ',
                message: 'Medium & High của bộ phim đang được để trống, vui lòng xem lại !',
                reason: 'không tìm thấy nội dung yêu cầu , có thể bạn đang để trống phần Medium & High của bộ phim',
            }
        })
        res.end()
    } else {
        let newMovie = new Movie({
            name: {
                title: title, // tiêu đề hiển thị
                title_EN: title_EN, // têu đề bằng tiếng anh hoặc là 1 tên khác của bộ phim
            },
            moment: {
                create_at: moment().format('YYYY-MM-DD'),
            },
            information: {
                status: 0, // trạng thái => số tập hiện tại đã cập nhật
                publishTime: publishTime, // ngày phát hành format : YYYY-MM-DD
                nation: nation, // quốc gia phát hành
                duration: duration, // thời lượng của phim,
                language: language, // ngôn ngữ hỗ trợ khi xem phim
                production_company: production_company,// công ty sản xuất phim
                total_episodes: total_episodes // TỔNG SỐ TẬP CỦA PHIM,
            },
            scores: 0, // điểm số đánh gia bộ phim hay hay ko min 0 - max 10
            interactive: {
                view: 0,// số lượng lượt xem
                like: 0, // số lượng người thích
            },
            keyword: keyword,
            trailer: trailer,
            thumbnails: {
                medium: {
                    url: medium,
                    width: 320,
                    height: 180
                },
                high: {
                    url: high,
                    width: 480,
                    height: 360
                }
            }
        })

        await newMovie.save(function (err, product) {
            if (err) {
                res.json({
                    error: {
                        code: 400,
                        err: 'Yêu cầu không hợp lệ ',
                        message: 'Vui lòng kiểm tra lại REST API',
                        reason: err
                    }
                })
                res.end()
            } else {
                res.json({
                    response: {
                        code: 201,
                        message: 'Đã tạo',
                        snippet: newMovie
                    }
                })
                res.end()
            }
        })
    }
}


// add category in movie
exports._addCategory = async (req, res) => {
    const { movie, category } = req.query
    if (!movie && !category) {
        res.json({
            error: {
                code: 404,
                err: 'movie & category ',
                message: 'movie & category của bộ phim đang được để trống, vui lòng xem lại !',
                reason: 'không tìm thấy nội dung yêu cầu , có thể bạn đang để trống phần movie & category của bộ phim',
            }
        })
        res.end()
    } else {
        // console.log(movie,category);
        await Category_Movie.findOne({ 'movie': movie,'category':category }, function (e, data) {
            // console.log(data);
            if (e) {
                res.json({
                    error: {
                        code: 400,
                        err: 'Yêu cầu không hợp lệ ',
                        message: 'Vui lòng kiểm tra lại REST API',
                        reason: e
                    }
                })
                res.end()
            } else {
                if (!data) {
                    // console.log('khong co data');
                    let addCate = new Category_Movie({
                        create_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                        category: category,
                        movie: movie,
                    })
                    addCate.save(function (err) {
                        if (err) {
                            res.json({
                                error: {
                                    code: 400,
                                    err: 'Yêu cầu không hợp lệ ',
                                    message: 'Vui lòng kiểm tra lại REST API',
                                    reason: err
                                }
                            })
                            res.end()
                        } else {
                            res.json({
                                response: {
                                    code: 201,
                                    message: 'Đã tạo',
                                    snippet: addCate
                                }
                            })
                            res.end()
                        }
                    })
                } else {
                    // console.log('co data');
                    res.json({
                        error: {
                            code: 405,
                            err: 'Yêu cầu không được phép',
                            message: 'Bộ Phim này đã được thêm thể loại này rồi , bạn không thể thêm thể loại này cho bộ phim này nữa !',
                            reason: 'bộ phim đã được thêm thể loại này rồi !'
                        }
                    })
                    res.end()
                }

            }


        })
    }
}

// get category by movie 
exports._findCategoryByMovie = async (req,res)=>{
    const {movie_id} = req.query
    await Category_Movie.find({'movie':movie_id}).populate('category').exec(function(err,data){
        if (err) {
            res.json({
                error: {
                    code: 400,
                    err: 'Yêu cầu không hợp lệ ',
                    message: 'Vui lòng kiểm tra lại REST API',
                    reason: err
                }
            })
            res.end()
        } else {
            res.json({
                response: {
                    code: 302,
                    snippet: data
                }
            })
            res.end()
        }
    })
}

// get movie by id

exports._findMovieByID = async (req,res)=>{
    const {movie_id} = req.query
    await Movie.findById({'_id':movie_id},function(err,data){
        if (err) {
            res.json({
                error: {
                    code: 400,
                    err: 'Yêu cầu không hợp lệ ',
                    message: 'Vui lòng kiểm tra lại REST API',
                    reason: err
                }
            })
            res.end()
        } else {
            res.json({
                response: {
                    code: 302,
                    snippet: data
                }
            })
            res.end()
        }
    })
}