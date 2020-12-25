const mongoose = require("mongoose");
const schema = mongoose.Schema;

const video = new schema({
    position : Number,
    link:String,
    type:String,
    create_at:Date,
    delete_at:Date,
    update_at:Date,
    movie: { type: schema.Types.ObjectId, ref: 'Movie' },
});

module.exports = mongoose.model("video", video);
