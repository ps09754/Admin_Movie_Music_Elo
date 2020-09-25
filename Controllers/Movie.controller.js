const Category = require('../Models/Category');
const Category_Movie = require('../Models/Category_Movie')
const Video = require('../Models/Video');
const Movie = require('../Models/Movie')
const moment = require('moment');

// add Movie
exports._addMovie = (req, res) => {
    let movie = new Movie({
        name: 'Đường Chuyên',
        directer: 'Long Tiểu Xuyên',
        status: 'Hoàn Tất',
        create_at: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        update_at: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        delete_at: null,
        starring: ['Trương Trí Nghiêu', 'Vương Văn Kiệt', 'Viên Vịnh Nghi', 'Trương Giai Ninh'],
        screenwriter: 'cập nhật sau',
        country: 'Trung Quốc',
        language: 'Phụ đề Việt',
        years: '2018',
        duration: '29/10/2018',
        episode: 0,
        score: 0,
        introduction: 'Bộ phim xoay quanh câu chuyện dở khóc dở cười của nhà khảo cổ học Dương Diệp sau khi gặp bão cát vô tình xuyên không về thời Đường, từ đó mắc kẹt giữa những mưu tính tranh đoạt vương quyền.',
        cover_img: 'https://firebasestorage.googleapis.com/v0/b/duan2-38e02.appspot.com/o/Movie%2FAction%2F%C4%90%C6%B0%E1%BB%9Dng%20chuy%C3%AAn%2Fduongchuyen.jpg?alt=media&token=98713782-e309-429f-b67b-32e45fb402f1',
    })
    movie.save(function (error, moviedata) {
        if (error) {
            res.json({
                result: false,
                message: error.message,
                status: 'Error add Movie'
            });
        } else {
            // let category_ida =  Category.find({name:'Viễn Tưởng'})
            // console.log(category_ida);
            let cate_movie = new Category_Movie({
                status: 'OK',
                create_at: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
                update_at: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
                delete_at: null,
                category_id: '5f63279ee02d2a2de853e2ba',
                movie_id: movie._id,

            })
            cate_movie.save(err => {
                if (err) {
                    res.json({
                        result: false,
                        message: err.message,
                        status: 'Error add Category_Movie'
                    });
                } else {
                    res.json({
                        result: true,
                        message: 'result ok',
                        datamovie: moviedata,
                    });
                }
            })
        }
    })



}

// add movie by body

exports._addMoviePostBody = (req, res) => {
    let movie_new = new Movie({
        name: req.body.name,
        directer: req.body.directer,
        status: req.body.status,
        create_at: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        update_at: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        delete_at: null,
        starring: req.body.starring,
        screenwriter: req.body.screenwriter,
        country: req.body.country,
        language: req.body.language,
        years: req.body.years,
        duration: req.body.duration,
        episode: req.body.episode,
        score: req.body.score,
        introduction: req.body.introduction,
        cover_img: req.body.cover_img,
    })
    movie_new.save(error => {
        if (error) {
            res.json({
                result: false,
                message: error.message,
                status: 'Error add Movie'
            });
        } else {

            res.json({
                result: false,
                message: 'result ok movie',
                movie: movie_new,
            });

        }
    })

}

// get Movie by id
exports._getMovieByID = (req, res) => {
    new Promise((resolve, reject) => {
        Movie.findById({ _id: req.params.movie_id }, function (err, data) {
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
                            category: data.map((callback, index) => {
                                return { index: index, name: callback.category_id.name, category_id: callback.category_id._id }
                            }),
                            movie: movie,
                        });
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
    Movie.find({}, function (err, data){
        if(err) {
            res.json({
                result: false,
                message: 'get all movie fail ! ' + err.message,
                items: []
            });
        }else{
            res.json({
                result: true,
                message: 'get all movie ok!',
                items: data
            })
        }
    })
}
