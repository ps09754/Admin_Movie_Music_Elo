const Title = require("../Models/Title");

exports.newTitle = async function (req, res) {
  let title = new Title({
      image:'https://firebasestorage.googleapis.com/v0/b/elomovie-45fe1.appspot.com/o/Title%2F%C4%90%E1%BA%A5u%20La%20%C4%90%E1%BA%A1i%20L%E1%BB%A5c%2Ftitle_dauladailucj.jpeg?alt=media&token=d91a4d80-067a-48e8-abfb-e45947ffeeaf',
      title: 'Đấu La Đại Lục',
      description:'là thể loại phim hoạt hình đang được nhiều người theo dõi.',
      createDate:new Date(),
      updateDate:new Date(),
      idfilm:'5f45242156deaa117417544f',
  })

  title.save(function (err){
      if (err){
          res.json({result:false,"error":err,data:title})
      }
  })
};


// api get Title by creacte Date

exports.getTitlebycreateDate = async function (req, res) {
    Title.find(function (err, title) {
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
          message:'Request data Title OK',
          items: title
        })
  
      }
    }).sort({ createDate: 1 });
  };
