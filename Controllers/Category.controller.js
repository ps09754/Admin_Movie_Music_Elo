const Category = require('../Models/Category')

exports.addCategory = async function(req, res){
    let category = new Category({
        name: "Chiếu rạp",
        movieId:["5f4b6c59d95e89415ca335e7"],
    })

    category.save(function(err){
        if (err){
            logger.error(err)
        }else{
            console.log('Added !');
        }
    })
}