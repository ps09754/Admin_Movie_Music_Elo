const mongooes = require("mongoose");
const schema = mongooes.Schema;

const title = new schema({
    image: String,
    title: String,
    description: String,
    creacteDate: Date,
    updateDate: Date,
    idfilm: String,
});

module.exports = mongooes.model("Title", title);
