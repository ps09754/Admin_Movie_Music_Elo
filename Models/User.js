const mongoose = require("mongoose");
const schema = mongoose.Schema;

var user = new mongoose.Schema({
    login_at:Date,
    google: {
        name: { type: String },
        gmail: { type: String },
        photo: { type: String },
        token: { type: String }
    },
    facebook: {
        id: { type: String },
        token: { type: String },
        gmail: { type: String },
        name: { type: String },
        photo: { type: String }
    }
});

module.exports = mongoose.model("tbl_user", user);
