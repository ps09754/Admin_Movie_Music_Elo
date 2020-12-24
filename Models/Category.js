const mongoose = require("mongoose");
const schema = mongoose.Schema;

const category = new schema({
    title: String, // tên thể loại phim
    create_at: Date,// ngày thêm thể loại  YYYY-MM-DD,
    delete_at: Date,// ngày xóa thể loại
});

module.exports = mongoose.model("Category", category);
