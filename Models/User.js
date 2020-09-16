const mongooes = require('mongoose');
const schema = mongooes.Schema;

const user = new schema({
    username: String,
    password: String,
    name: String,
    email: String,
    image: String,
    isChanged: Boolean,
});

module.exports = mongooes.model('Users', user); 