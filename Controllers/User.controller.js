const Category = require('../Models/Category');
const Category_Movie = require('../Models/Category_Movie')
const Video = require('../Models/Video');
const Movie = require('../Models/Movie')
const User = require('../Models/User');
const moment = require('moment');


exports._addUser =async (req,res) =>{
    let new_user = new User({
        create_at:moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        update_at:moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        delete_at:null,
        token_google:{
            idToken:req.body.idToken_google,
            user:{
                email:req.body.email_google,
                photo:req.body.photo_google,
                name:req.body.name_google
            }
        },
        token_facebook: {
            idToken:req.body.idToken_fb,
            user:{
                name:req.body.name_fb,
                photo:req.body.photo_fb,
            }
         }
    })
    await new_user.save(function(err){
        if(err){
            res.json({
                result:false,
                message:err.message,
                status:'Error add Google'
            });
        }else{
            res.json({
                result:true,
                status:'add Google ok',
                items:new_user
            });
        }
    })
}

// get user by _id
exports._getDataUser_by_id = async (req,res) =>{
    User.find({_id:req.params.id},function(err,user){
        if(err){
            res.json({
                result:false,
                message:err.message,
                status:'Error get User'
            });
        }else{
            res.json({
                result:true,
                status:'Get User OK!',
                items:user
            });
        }
    })
}

