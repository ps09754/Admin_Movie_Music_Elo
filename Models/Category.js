const mongooes = require('mongoose');
const schema = mongooes.Schema;

const category = new schema({
    name: String,
    movieId:[],
});

module.exports = mongooes.model('Category', category); 