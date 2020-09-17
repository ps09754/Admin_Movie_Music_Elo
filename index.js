var express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
// set layout ejs
app.set('view engine', 'ejs');
app.set('views', './views');
// setting bodyparser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const db = require('./Contants/MongoKey').mongoURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        console.log('mongo connected error:' + err);

    } else {
        console.log('mongo connected ok !');

    }
})

// route film
const Movie = require('./Routes/Movie.route');
Movie(app)
// route category
const Category = require('./Routes/Category.route')
Category(app)

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));