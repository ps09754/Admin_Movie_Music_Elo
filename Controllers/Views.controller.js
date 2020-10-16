const Movie = require('../Models/Movie')
exports._ViewFilm=function (req,res){
    Movie.find({},function(err,movie){
        if (err) {
            res.json({
                result:false,
                message:'Result fail '+err.message
            })
        }else{
            res.render('Dashboard',{movie:movie})
        }
    })
}