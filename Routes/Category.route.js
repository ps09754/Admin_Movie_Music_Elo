module.exports = function (app,key) {
    const Category = require("../Controllers/Category.controller");
    // CREATE
    app.route(`/category/${key}/c1/create`).get(Category._createCategory);
   
    
  };
  