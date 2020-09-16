const User = require("../Models/User");

exports.newUser = async function (req, res) {
  let user = new User({
    username: req.params.username,
    password: req.params.password,
    image: "https://i7.pngguru.com/preview/636/141/181/computer-icons-user-images-included.jpg",
  });

  user.save(function (err) {
    if (err) {
      logger.error(err);
    } else {
      console.log("Added !");
    }
  });
};
