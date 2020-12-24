const mongoose = require("mongoose");
const schema = mongoose.Schema;

const category_movie = new schema({
    create_at: Date,
    category: { type: schema.Types.ObjectId, ref: 'Category' },
    movie: { type: schema.Types.ObjectId, ref: 'Movie' },
});

module.exports = mongoose.model("Category_Movie", category_movie);
