const History = require('../Models/History')
const moment = require('moment');
exports._addHistory=async(req,res)=>{
    let history = new History({
        create_at:moment().format('YYYY-MM-DD HH:mm'),
        movie_id:req.body.movie_id,
        video_id:req.body.video_id,
        duration:req.body.duration,
        user_id:req.body.user_id,
    })
    history.save(function (err) {
        if(err){
            res.json({
                result:false,
                message:'Add history fail '+err.message
            })
        }else{
            res.json({
                result:true,
                message:'add ok!'
            })
        }
    })
}

exports._findHistory = async (req,res)=>{
    History.find({user_id:req.params.user_id},function(err,data){
        if (err) {
            res.json({
                result:false,
                message:'get history by user fail '+err.message
            })
        }else{
            res.json({
                result:true,
                message:'get history by user ok ',
                items: data
            })
        }
    })
}

exports._deleteHistory = async (req,res) =>{
    History.remove({_id:req.params._id},function(err){
        if(err){
            res.json({
                result:false,
                message:'delete history fail '+err.message
            })
        }else{
            res.json({
                result:true,
                message:'delete history ok!'
            })
        }
    })
}