const Category = require('../Models/Category');
const Category_Movie = require('../Models/Category_Movie')
const Video = require('../Models/Video');
const Movie = require('../Models/Movie')
const User = require('../Models/User');
const moment = require('moment');

exports._addUser = async (req, res) => {
    if (req.params.type === 'f') {
        User.findOne({ 'facebook.id': req.body.id }, function (e1, r1) {
            if (e1) {
                res.json({
                    result: false,
                    message: 'check gmail user facebook fail : ' + e1.message,
                    position: 1.1
                })

            } else {
                if (r1 == [] || r1 == null) {
                    let user = new User({
                        facebook: {
                            name: req.body.name,
                            gmail: req.body.gmail,
                            photo: req.body.photo,
                            token: req.body.token,
                            id: req.body.id,
                        },
                        login_at:moment().format('YYYY-MM-DD HH:mm')
                    })

                    user.save(function (e2) {
                        if (e2) {
                            res.json({
                                result: false,
                                position: 2.1,
                                message: 'create user facebook fail : ' + e2.message
                            })
                        } else {
                            res.json({
                                result: true,
                                position: 2.2,
                                message: 'create user facebook ok!'
                            })
                        }
                    })
                } else {
                    User.findOneAndUpdate({ 'facebook.gmail': req.body.gmail },{
                        login_at:moment().format('YYYY-MM-DD HH:mm'),
                    },function(er1){
                        if (er1) {
                            res.json({
                                result: false,
                                position: 1.1,
                                message: 'check data user facebook -> update login fail '+er1.message,
                                
                            })
                        }else{
                            res.json({
                                result: true,
                                position: 1.2,
                                message: 'check data user facebook -> return 1 user',
                                items: r1
                            })
                        }
                    })
                }
            }
        })
    } else if (req.params.type === 'g') {
        User.findOne({ 'google.gmail': req.body.gmail }, function (e1, r1) {
            if (e1) {
                res.json({
                    result: false,
                    message: 'check gmail user google fail : ' + e1.message,
                    position: 1.1
                })

            } else {
                if (r1 == [] || r1 == null) {
                    let user = new User({
                        google: {
                            name: req.body.name,
                            gmail: req.body.gmail,
                            photo: req.body.photo,
                            token: req.body.token
                        },
                        login_at:moment().format('YYYY-MM-DD HH:mm')
                    })

                    user.save(function (e2) {
                        if (e2) {
                            res.json({
                                result: false,
                                position: 2.1,
                                message: 'create user google fail : ' + e2.message
                            })
                        } else {
                            res.json({
                                result: true,
                                position: 2.2,
                                message: 'create user google ok!'
                            })
                        }
                    })
                } else {
                    res.json({
                        result: true,
                        position: 1.2,
                        message: 'check data user google -> return 1 user',
                        items: r1
                    })
                }
            }
        })
    } else {
        res.json({
            result: false,
            message: 'type = null ',
            position: 3
        })
    }
}

exports._asyncUser = async (req, res) => {
    if (req.params.type === 'g') {
        await User.findOneAndUpdate({ _id: req.params._id}, {
            google: {
                name: req.body.name,
                gmail: req.body.gmail,
                photo: req.body.photo,
                token: req.body.token
            },
        },function(err){
            if (err) {
                res.json({
                    result:false,
                    message:'async user google fail '+err.message
                })
            }else{
                res.json({
                    result:true,
                    message:'async user google ok '
                })
            }
        })
    }else if (req.params.type === 'f') {
        await User.findOneAndUpdate({ _id: req.params._id}, {
            facebook: {
                id: req.body.id,
                token: req.body.token,
                gmail: req.body.gmail,
                name: req.body.name,
                photo: req.body.photo
            }
        },function(err){
            if (err) {
                res.json({
                    result:false,
                    message:'async user facebook fail '+err.message
                })
            }else{
                res.json({
                    result:true,
                    message:'async user facebook ok '
                })
            }
        })
    }
    
}


// get user by _id
exports._getDataUser_by_id = async (req, res) => {
    User.find({ _id: req.params.id }, function (err, user) {
        if (err) {
            res.json({
                result: false,
                message: err.message,
                status: 'Error get User'
            });
        } else {
            res.json({
                result: true,
                status: 'Get User OK!',
                items: user
            });
        }
    })
}

