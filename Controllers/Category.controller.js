const Movie = require('../Models/Movie')
const Category = require('../Models/Category')
const moment = require('moment')

exports._createCategory = async (req, res) => {
    const { title } = req.query 
    if (!title) {
        res.json({
            error: {
                code: 404,
                err: 'title ',
                message: 'title của thể loại đang được để trống, vui lòng xem lại !',
                reason: 'không tìm thấy nội dung yêu cầu , có thể bạn đang để trống phần title của thể loại',
            }
        })
        res.end()
    } else {
        let newCategory = new Category({
            title: title,
            create_at: moment().format('YYYY-MM-DD')
        })
        await newCategory.save(function (err, product) {
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
                        snippet: newCategory
                    }
                })
                res.end()
            }
        })
    }
}