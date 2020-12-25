const Movie = require('../Models/Movie')
const Video = require('../Models/Video')
const moment = require('moment')

exports._addVideoByMovie = async (req,res)=>{
    const {position,link,type,movie} = req.body
    await Video.findOne({'movie':movie,'position':position},function(err,data){
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
        }else{
            if (!data) {
                let newVideo = new Video({
                    position:position,
                    create_at:moment().format('YYYY-MM-DD'),
                    link:link,
                    movie:movie
                })
                newVideo.save(function(e,product){
                    if (e) {
                        res.json({
                            error: {
                                code: 400,
                                err: 'Yêu cầu không hợp lệ ',
                                message: 'Vui lòng kiểm tra lại REST API',
                                reason: err
                            }
                        })
                        res.end()
                    }else{
                        res.json({
                            response: {
                                code: 201,
                                message: 'Đã tạo',
                                snippet: newVideo
                            }
                        })
                        res.end()
                    }
                })
            }else{
                res.json({
                    error: {
                        code: 405,
                        err: 'Yêu cầu không được phép',
                        message: 'Bộ phim này đã có tập '+position +' rồi , không thể thêm nữa',
                        reason: 'trùng lặp tập phim !'
                    }
                })
                res.end()
            }
        }
    })
}