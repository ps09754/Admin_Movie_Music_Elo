const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Movie = new schema({
    name: {type:String, minlength:10 , maxlength:100},
    directer: {type:String, minlength:2 , maxlength:100},
    status: String,
    create_at: Date ,
    update_at:Date,
    delete_at:Date,
    starring:[],
    screenwriter:{type:String, minlength:2 , maxlength:100},
    country:{type:String, minlength:2 , maxlength:100},
    language:{type:String, minlength:2 , maxlength:100},
    years:{type:String, minlength:2 , maxlength:100},
    duration:{type:String, minlength:2 , maxlength:100},
    episode: {type:Number},
    score: Number,
    introduction:{type:String, minlength:2 , maxlength:300},
    cover_img:{type:String, minlength:2 , maxlength:300},
});

module.exports = mongoose.model("tbl_movie", Movie);
