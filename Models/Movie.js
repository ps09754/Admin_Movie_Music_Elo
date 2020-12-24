const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Movie = new schema({
    name: {
        title: String, // tiêu đề hiển thị
        title_EN: String, // têu đề bằng tiếng anh hoặc là 1 tên khác của bộ phim
    },
    moment: {
        create_at: Date,
        delete_at: Date,
    },
    information: {
        status: String, // trạng thái => số tập hiện tại đã cập nhật
        publishTime: Date, // ngày phát hành format : YYYY-MM-DD
        nation: String, // quốc gia phát hành
        duration: String, // thời lượng của phim,
        language: String, // ngôn ngữ hỗ trợ khi xem phim
        production_company: String,// công ty sản xuất phim
        total_episodes: String // TỔNG SỐ TẬP CỦA PHIM,
    },
    scores: Number, // điểm số đánh gia bộ phim hay hay ko min 0 - max 10
    interactive: {
        view: Number,// số lượng lượt xem
        like: Number, // số lượng người thích
    },
    keyword: [String],
    trailer: String,
    thumbnails: {
        medium: {
            url: String,
            width: Number,
            height: Number
        },
        high: {
            url: String,
            width: Number,
            height: Number
        }
    }
});

module.exports = mongoose.model("Movie", Movie);
