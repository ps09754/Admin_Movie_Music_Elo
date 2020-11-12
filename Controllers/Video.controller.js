const Category = require('../Models/Category');
const Category_Movie = require('../Models/Category_Movie')
const Video = require('../Models/Video');
const Movie = require('../Models/Movie')
const moment = require('moment');
const Admin = require('../Contants/firebase_config');
const { response } = require('express');
const { topPic } = require('../Contants/contants')

exports._addVideo = async (req, res) => {
    await Video.findOne({ 'movie_id': req.body.movie_id }, function (e1, video) {
        // console.log(video);
        if (e1) {
            res.json({
                result: false,
                message: 'find position video movie fail' + err.message
            })
        } else {
            if (video) {
                if (video.position == req.body.position) {
                    console.log('bằng');
                    res.json({
                        result: false,
                        message: 'video movie tập ' + video.position + ' đã tồn tại, vui lòng add video mới '
                    })
                } else {
                    console.log('không bằng');
                    let newVideo = new Video({
                        create_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                        update_at: null,
                        delete_at: null,
                        movie_id: req.body.movie_id,
                        title: 'Tập ' + req.body.position,
                        position: req.body.position,
                        link: req.body.link,
                        type_source: req.body.type_source
                    })

                    newVideo.save(function (err) {
                        if (err) {
                            res.json({
                                result: false,
                                message: 'add video movie fail' + err.message
                            })
                        } else {

                            Movie.updateOne({ _id: req.body.movie_id }, {
                                status: req.body.position
                            }, function (e3) {
                                if (e3) {
                                    res.json({
                                        result: false,
                                        message: 'add video movie fail' + err.message,
                                        note: 'update status movie fail' + e3
                                    })
                                } else {
                                    const message_option = {
                                        topic: topPic,
                                        notification: {
                                            title: req.body.title,
                                            body: 'Cập nhật lúc '+  moment().format('HH:mm')+ ' !'
                                          },
                                        data:{
                                            position:req.body.position,
                                            movie_id:req.body.movie_id,
                                            type:'video',
                                            video_id:newVideo._id.toString(),
                                            movie_id:req.body.movie_id,
                                        }
                                     
                                    }
                                    Admin.admin.messaging().send(message_option).then(response=>{
                                        res.json({
                                            result: true,
                                            message: 'add video movie ok',
                                            items: newVideo,
                                            send:'ok'+response,
                                            dataSend:message_option
                                        })
                                    }).catch(e=>{
                                        res.json({
                                            result: true,
                                            message: 'add video movie ok',
                                            items: newVideo,
                                            send:'fail '+e.message
                                        })
                                    })
                                  
                                }
                            })
                        }
                    })
                }
            } else {
                let newVideo = new Video({
                    create_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                    update_at: null,
                    delete_at: null,
                    movie_id: req.body.movie_id,
                    title: 'Tập ' + req.body.position,
                    position: req.body.position,
                    link: req.body.link,
                    type_source: req.body.type_source
                })

                newVideo.save(function (err) {
                    if (err) {
                        res.json({
                            result: false,
                            message: 'add video movie fail' + err.message
                        })
                    } else {
                        Movie.updateOne({ _id: req.body.movie_id }, {
                            status: req.body.position
                        }, function (e3) {
                            if (e3) {
                                res.json({
                                    result: false,
                                    message: 'add video movie fail' + err.message,
                                    note: 'update status movie fail' + e3
                                })
                            } else {
                                res.json({
                                    result: true,
                                    message: 'add video movie ok',
                                    items: newVideo
                                })
                            }
                        })
                    }
                })
            }

        }
    })
}

exports._updateVideo = async (req, res) => {
    await Video.updateOne({ _id: req.params._id }, {
        title: req.body.title,
        update_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        status: req.body.status,
        position: req.body.position,
        link: req.body.link,
        type_source: req.body.type_source
    }, function (err) {
        if (err) {
            res.json({
                result: false,
                message: 'update video movie fail' + err.message
            })
        } else {
            res.json({
                result: true,
                message: 'update video movie ok'
            })
        }
    })
}

exports._getVideo = async (req, res) => {
    await Video.findOne({ _id: req.params._id }, function (err, video) {
        if (err) {
            res.json({
                result: false,
                message: 'get video movie fail' + err.message
            })
        } else {
            res.json({
                result: true,
                message: 'get video movie ok',
                items: video
            })
        }
    })
}

exports._getAllVideoByMovie = async (req, res) => {
    await Video.find({ movie_id: req.params._id }, function (err, data) {
        if (err) {
            res.json({
                result: false,
                message: 'get video movie fail' + err.message
            })
        } else {
            res.json({
                result: true,
                message: 'get video movie ok',
                items: data
            })
        }
    })
}

exports._deleteVideo = async (req, res) => {
    await Video.updateOne({ _id: req.params._id }, {
        delete_at: moment().format('YYYY-MM-DD HH:mm:ss')
    }, function (err) {
        if (err) {
            res.json({
                result: false,
                message: 'delete video fail ' + err.message
            })
        } else {
            res.json({
                result: true,
                message: ' delete video ok '
            })
        }
    })
}