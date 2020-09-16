const Film = require("../Models/Film");
const Cast = require("../Models/Cast");

exports.addFilm = async (req, res) => {
  let newfilm = new Film({
    name: "Natra ma đồng giáng thế",
    avatar: "https://luxury-inside.vn/data/uploads/2019/08/na-tra12.jpg",
    imageBackground: "https://i.ytimg.com/vi/mbyaJdSGdXU/maxresdefault.jpg",
    des: "Na Tra - GAI Châu Diên/ Đại Dương Dương | 哪吒 - GAI周延 / 大痒痒 Sáng tác: GAI Châu Diên, Đại Dương Dương Lời: GAI Châu Diên, Đại Dương Dương Na Tra Chi Ma Đồng Gi...",
    national: "Trung Quốc",
    evaluate: 0,
    numbOfEva: 0,
    yearofrelease: "2020",
    trailer: "https://www.youtube.com/embed/yCJy9roIv8Q",
    date: new Date(),
    age: "7+"
  });

  newfilm.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("add film ok !");
    }
  });
};
