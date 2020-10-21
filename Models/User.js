const mongoose = require("mongoose");
const schema = mongoose.Schema;

var user = new mongoose.Schema({
    create_at:Date,
    login_at:Date,
    google_id:{type:String,unique: true},
    facebook_id:{type:String,unique: true},
});

module.exports = mongoose.model("tbl_user", user);
