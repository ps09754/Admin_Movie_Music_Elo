var express = require('express');
var mongoose = require('mongoose');

var app = express();

const db = require('./Contants/MongoKey').mongoURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        console.log('mongo connected error:' + err);

    } else {
        console.log('mongo connected ok !');

    }
})

// route film
const Film = require('./Routes/Film.route');
Film(app)

// route cast
const Cast = require('./Routes/Cast.route');
Cast(app);

// route Episode
const Episode = require('./Routes/Episode.route')
Episode(app)

//route Category
const Category = require('./Routes/Category.route')
Category(app)

// api film 
const api_film = require('./Routes/Api_Film.route')
api_film(app)

// Title 
const Title = require('./Routes/Title.route')
Title(app)

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));