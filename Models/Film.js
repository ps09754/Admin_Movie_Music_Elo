const mongooes = require("mongoose");
const schema = mongooes.Schema;

const film = new schema({
    name: String,
    avatar: String,
    imageBackground: String,
    des: String,
    national: String,
    evaluate: Number,
    numbOfEva: Number,
    yearofrelease: { type: String },
    date: Date,
    trailer: String,
    age: String,
});

module.exports = mongooes.model("Film", film);
