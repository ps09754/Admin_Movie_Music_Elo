const mongooes = require("mongoose");
const schema = mongooes.Schema;

const Episode = new schema({
  movieId: String,
  deleted: Boolean,
  data: [{
    code: String,
    view: Number,
    episode: Number,
  }]
});

module.exports = mongooes.model("Episode", Episode);
