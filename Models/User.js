const mongoose = require("mongoose");
const schema = mongoose.Schema;

const user = new schema({
    create_at:Date,
    update_at:Date,
    delete_at:Date,
    token_google: {
        idToken: String,
        user: {
            email: String,
            photo: String, 
            name: String 
        }
    },
    token_facebook: {
        idToken:String,
        user:{
            name:String,
            photo:String,
        }
     }
});

module.exports = mongoose.model("tbl_user", user);
// const user = new schema({
//     idToken_google: String,
//     user_google: {type:Object},
//     idToken_facebook:String,
//     user_facebook={type:Object}
// });