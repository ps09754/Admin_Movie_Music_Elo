const mongooes = require('mongoose');
const schema = mongooes.Schema;

const Cast = new schema({
    idcast:String,
    nameCast:String,
    image: String,
    DateofBirth:String,
    nation:String,
    Views:Number,
    story:String,
    date: Date,
    deleted:Boolean,
});

module.exports = mongooes.model('Cast',Cast); 