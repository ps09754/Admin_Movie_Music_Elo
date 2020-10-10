const mongoose = require("mongoose");
const schema = mongoose.Schema;

const user = new schema({
    create_at:Date,
    update_at:Date,
    delete_at:Date,
    token_google: {
        idToken: {type: String, unique: true, require: true},
        user: {
            email: {type: String, unique: true, require: true},
            photo: String, 
            name: String 
        }
    },
    token_facebook: {
        idToken: {type: String, unique: true, require: true},
        user:{
            name:String,
            photo:String,
        }
     }
});

module.exports = mongoose.model("tbl_user", user);
