const Episode = require("../Models/Episode");
const Film = require("../Models/Film");
const Cast = require("../Models/Cast");
const Category = require("../Models/Category");
const User = require("../Models/User");

//signup with guest account
exports.signupWithGuest = async function (req, res) {
  user = new User({
    username: req.body.username,
    password: "",
    name: "",
    email: "",
    image: "",
    isChanged: false,
  });

  await user.save((error) => {
    if (error) {
      res.json(error);
    }
    var result = ({result: 1});
    res.json(result);
  });
};

//lấy lượt view
//exports.getView
exports.getViewByMovieId = async function (req, res) {
  Episode.find(
    { movieId: req.params.movieId },
    { _id: 0, "data.view": 1 },
    function (err, episode) {
      if (err) {
        res.send(err);
      }
      res.json(episode);
    }
  );
};
//lấy phim theo id phim
exports.getEpisodesByMovieId = async function (req, res) {
  Episode.find(
    { movieId: req.params.movieId },
    { _id: 0, deleted: 0, "data._id": 0 },
    function (err, episode) {
      if (err) {
        res.send(err);
      }
      res.json(episode);
    }
  ).sort({ "data.view": -1 });
};

exports.getCastWithMaxView = async function (req, res) {
  Cast.find(function (err, cast) {
    if (err) {
      res.send(err);
    }
    res.json(cast);
  })
    .sort(1)
    .limit(2);
};

//get film by id
exports.getFilmsById = async function (req, res) {
  Film.find({ _id: req.params.id }, function (err, film) {
    if (err) {
      res.send(err);
    } else {
      res.json(film);
    }
  });
};

// get film by cast (lấy danh sách phim theo diễn viên)
exports.getFilmsbyCast = async function (req, res) {
  Film.find({ cast: req.params.cast }, function (err, film) {
    if (err) {
      res.send(err);
    } else {
      res.json(film);
    }
  });
};

// get film by category (lấy danh sách phim theo thể loại)

exports.getFilmsbyCategory = async function (req, res) {
  Film.find({ Category: req.params.Category }, function (err, film) {
    if (err) {
      res.send(err);
    } else {
      res.json(film);
    }
  });
};

// get film by CreateDate (lấy danh sách phim theo ngày đăng)

exports.getFilmsbyCreateDate = async function (req, res) {
  Film.find(function (err, film) {
    if (err) {
      res.json({
       result:false,
       message:err.message,
       items:null 
      });
    } else {
      // res.object('result:'+true)
      res.json({
        result:true,
        message:'Request data OK',
        items: film
      })

    }
  }).sort({ createDate: 1 });
};

// get film by update date (lấy danh sách phim theo ngày update)
exports.getFilmsbyUpdateDate = async function (req, res) {
  Film.find(function (err, film) {
    if (err) {
      res.json({
       result:false,
       message:err.message,
       items:null 
      });
    } else {
      // res.object('result:'+true)
      res.json({
        result:true,
        message:'Request data OK',
        items: film
      })

    }
  }).sort({ updateDate: 1 });
};

exports.getCategoryByFilmId = async function (req, res) {
  Category.find({ movieId: req.params.movieId }, function (err, category) {
    if (err) {
      res.send(err);
    } else {
      res.json(category);
    }
  });
};
