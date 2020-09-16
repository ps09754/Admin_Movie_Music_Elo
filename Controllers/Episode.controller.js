const Episode = require("../Models/Episode");
const Film = require("../Models/Film");

exports.addEpisode = async function (req, res) {
  let episode = new Episode({
    movieId: "5f45242156deaa117417544f",
    deleted: false,
    data: [
      { code: "bcjVm61cU78", view: 0, episode: 1 },
      {
        code: "AnPguz4NqBo",
        view: 0,
        episode: 2,
      },
      {
        code: "DMuqn2F5TcY",
        view: 0,
        episode: 3,
      },
      {
        code: "rA0m01MA1CY",
        view: 0,
        episode: 4,
      },
      {
        code: "ot-n9-Q6Ch0",
        view: 0,
        episode: 5,
      },
      {
        code: "1XvNSpds7Zw",
        view: 0,
        episode: 6,
      },
      {
        code: "Ixi0-1pvdVc",
        view: 0,
        episode: 7,
      },
      {
        code: "wvWx5bUyvsY",
        view: 0,
        episode: 8,
      },
      {
        code: "VSAfWPtmj_o",
        view: 0,
        episode: 9,
      },
      {
        code: "l8oPn3sKZ_g",
        view: 0,
        episode: 10,
      },
      {
        code: "D-mrXloIZkI",
        view: 0,
        episode: 11,
      },
      {
        code: "GFLYONoL9H4",
        view: 0,
        episode: 12,
      },
    ],
  });

  episode.save(function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("add Episode ok !");
    }
  });
};
