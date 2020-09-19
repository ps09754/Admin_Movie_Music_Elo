const Category = require('../Models/Category');
const Category_Movie = require('../Models/Category_Movie')
const Video = require('../Models/Video');
const Movie = require('../Models/Movie')
const Cast = require('../Models/Cast')
const moment = require('moment');


exports._addCast = async(req,res)=>{
    let new_cast = new Cast({
        name:req.body.name,
        cover_image:req.body.cover_image,
        birthday:moment(req.body.birthday,'YYYY-MM-DDTHH:mm:ss'),
        nation:req.body.nation,
        create_at:moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        update_at:moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'),
        delete_at:null,
        view:0,
        story:req.body.story
    })

   await new_cast.save(function(err){
        if(err){
            res.json({
                result:false,
                message:err.message,
                status:'Error add Cast'
            });
        }else{
            res.json({
                result:true,
                status:'add Cast ok',
                items:new_cast
            });
        }
    })
}

exports._getCast_by_id = async(req,res)=>{
    Cast.find({_id:req.params.id},function(err,cast){
        if(err){
            res.json({
                result:false,
                message:err.message,
                cast:[]
            })
        }else{
            res.json({
                result:true,
                message:'ok!',
                cast:cast
            })
        }
    })
}