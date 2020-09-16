const Film = require('../Models/Film')
const Cast = require('../Models/Cast')

exports.addCast = async function(req, res){
    let cast = new Cast({
        idcast:'cast-chungtudon',
        nameCast:'Chung Tử Đơn',
        image: 'https://anh.eva.vn//upload/4-2016/images/2016-11-23/chung-tu-don-thang-than-coi-thuong-ngoi-sao-vo-thuat-ngo-kinh-3-1479893977-width916height675.jpg',
        DateofBirth:'27-07-1964',
        nation:'Trung Quốc',
        Height:175,
        weight:77,
        Views:2345,
        creacteDate:new Date(),
        updateDate:null,
        deleted:false,
    })
    cast.save(function(err) {
        if (err){
            log.error(err)
        }else{
            console.log('add cast ok :)');
        }
    })
}