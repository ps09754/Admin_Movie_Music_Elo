const Category = require('../Models/Category');
const Category_Movie = require('../Models/Category_Movie')
const Video = require('../Models/Video');
const Movie = require('../Models/Movie')
const User = require('../Models/User');
const moment = require('moment');


exports._getUser_Id = async (req, res) => {
    let newUser = new User({
        create_at: moment().format('YYYY-MM-DD HH:mm'),
        login_at: moment().format('YYYY-MM-DD HH:mm'),
        google_id: 'null',
        facebook_id: 'null'
    })
    try {
        const user_Id = (await newUser.save())._id
        res.json({
            result: true,
            message: 'create user_id ok',
            user_id: user_Id
        })
    } catch (err) {
        res.json({
            result: false,
            message: 'create user_id false' + err.message
        })
    }

}
// login  
exports._login = async (req, res) => {
    if (req.params.type === 'g') {
      User.findOne({_id:req.params.invite_id},function(err,user){
          if (err) {
              res.json({
                  result:false,
                  message:'login fail'+err.message
              })
          }else{
              if (user.google_id == 'null') {
                User.findOneAndUpdate({_id:req.params.invite_id},{
                    google_id:req.params.id,
                    login_at:moment().format('YYYY-MM-DD HH:mm')
                },function(e){
                    if (e) {
                        res.json({
                            result:false,
                            message:'login google fail '+e.message
                        })
                    }else{
                        res.json({
                            result:true,
                            position: 200,
                            message:'login google ok'
                        })
                    }
                })   
              }else{
                res.json({
                    result:true,
                    position: 100,
                    message:'login google ok -> 1 user',
                    items:user
                })
              }
          }
      })
    } else  if (req.params.type === 'f') {
        User.findOne({_id:req.params.invite_id},function(err,user){
            if (err) {
                res.json({
                    result:false,
                    message:'login fail'+err.message
                })
            }else{
                if (user.facebook_id == 'null') {
                  User.findOneAndUpdate({_id:req.params.invite_id},{
                      facebook_id:req.params.id,
                      login_at:moment().format('YYYY-MM-DD HH:mm')
                  },function(e){
                      if (e) {
                          res.json({
                              result:false,
                              message:'login facebook fail '+e.message
                          })
                      }else{
                          res.json({
                              result:true,
                              position: 200,
                              message:'login facebook ok'
                          })
                      }
                  })   
                }else{
                  res.json({
                      result:true,
                      position: 100,
                      message:'login facebook ok -> 1 user',
                      items:user
                  })
                }
            }
        })
      }
}

exports._asyncUser = async (req, res) => {
    if (req.params.type === 'g') {
       User.findOne({'google_id':req.params.id},function(err,user){
           if (err) {
               res.json({
                   result:false,
                   message:'async user google fail '+err.message
               })
           }else{
               if (user == [] || user == null || user == undefined ) {
                   console.log('abc');
                   User.findOneAndUpdate({_id:req.params.invite_id},{
                       google_id:req.params.id
                   },function(e){
                       if (e) {
                           res.json({
                               result:false,
                               message:'async user google fail '+e.message
                           })
                       }else{
                           res.json({
                               result:true,
                               position:100,
                               message:'async user google ok'
                           })
                       }
                   })
               }else{
                res.json({
                    result:false,
                    message:'This google account is already in use',
                    position:400,
                    items:user
                })
               }
           }
       })
    }else  if (req.params.type === 'f') {
        User.findOne({'facebook_id':req.params.id},function(err,user){
            if (err) {
                res.json({
                    result:false,
                    message:'async user facebook fail '+err.message
                })
            }else{
                if (user == [] || user == null || user == undefined ) {
                    console.log('abc');
                    User.findOneAndUpdate({_id:req.params.invite_id},{
                        facebook_id:req.params.id
                    },function(e){
                        if (e) {
                            res.json({
                                result:false,
                                message:'async user facebook fail '+e.message
                            })
                        }else{
                            res.json({
                                result:true,
                                position:100,
                                message:'async user facebook ok'
                            })
                        }
                    })
                }else{
                 res.json({
                     result:false,
                     message:'This facebook account is already in use',
                     position:400,
                     items:user
                 })
                }
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

