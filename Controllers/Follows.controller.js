const User = require('../Models/User')
const Movie = require('../Models/Movie')
const Comment = require('../Models/Comment')
const Evaluate = require('../Models/Evaluate')
const moment = require('moment')
const Follow = require('../Models/Follows')
const { populate } = require('../Models/Comment')



exports._addFollow = async(req,res)=>{
    Follow.findOne({'user_id':req.body.user_id,'movie_id':req.body.movie_id},function(err,data){
        if (err) {
            res.json({
                result:false,
                message :'Follow movie fail '+err.message,
                position:500
            })
        }else{
            if (data) {
                res.json({
                    result:false,
                    message:'Movie đã follow rồi nhé ~~',
                    position:400,
                    items:data
                })
            }else{
                let newFollow = new Follow({
                    create_at:moment().format('YYYY-MM-DD'),
                    movie_id:req.body.movie_id,
                    user_id:req.body.user_id
                })

                newFollow.save(function(e){
                    if (e) {
                        res.json({
                            result:false,
                            message:'create Follow fail'+e.message,
                            position:300
                        })
                    }else{
                        res.json({
                            result:true,
                            message:'create ok ',
                            position:200,
                            id:newFollow._id
                        })
                    }
                })
            }
        }
    })
}

exports._deleteFollow=async(req,res)=>{
    Follow.deleteOne({'user_id':req.params.user_id,'movie_id':req.params.movie_id},function(err){
        if (err) {
            res.json({
                result:false,
                message:'delete follow fail '+err.message,
                position:400
            })
        }else{
            res.json({
                result:true,
                message:'delete follow ok',
                position:200,
               
            })
        }
    })
}

exports._findFollowUser=async(req,res)=>{
    Follow.findOne({'user_id':req.params.user_id},function(err,data){
        if (err) {
            res.json({
                result:false,
                message:'find follow by user fail '+err.message,
                position:400
            })
        }else{
            res.json({
                result:true,
                message:'find follow by user ok',
                position:200,
                items:data
            })
        }
    })
}