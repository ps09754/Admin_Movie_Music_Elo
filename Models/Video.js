const mongoose = require("mongoose");
const schema = mongoose.Schema;

const video = new schema({
    status:{type:String,minlength:5,maxlength:300},
    create_at:Date,
    update_at:Date,
    delete_at:Date,
    movie_id:String,
    title:{type:String,minlength:5,maxlength:300},
    synopsis:{type:String,minlength:10,maxlength:400},
    position:{type:String,minlength:5,maxlength:300},
    link:String,
    id_link_youtube:String,
    type_source:String,

});

module.exports = mongoose.model("tbl_video", video);
