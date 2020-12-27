var express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const cors = require('cors')
const key = require('./Contants/contants')

var app = express();
// set layout ejs
app.set('view engine', 'ejs');
app.set('views', './views');
// setting bodyparser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// public static folder
app.use(express.static('Publics'));
app.options('*', cors())
const db = require('./Contants/MongoKey').mongoURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        console.log('mongo connected error:' + err);

    } else {
        console.log('mongo connected ok !');

    }
})

const Movie_Route = require('./Routes/Movie.route')
Movie_Route(app, key.key)

const Category_Route = require('./Routes/Category.route')
Category_Route(app, key.key)

const User_Route = require('./Routes/User.route')
User_Route(app)


const convert = require('./Routes/convert.route')
convert(app,key)

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
