
//< ===============================================>
const youtubedl = require('youtube-dl')

// Optional arguments passed to youtube-dl.

//<==========================================================>

exports._ConvertLink = async (req, res) => {
    // console.log('chay ne');
    const { video_id } = req.query
    const url = `https://www.youtube.com/watch?v=${video_id}`
    const options = ['--username=user', '--password=hunter2']

    youtubedl.getInfo(url, options, function (err, info) {
        if (err){
            res.json({
                response: {
                    code: 401,
                    message: 'convert link fail',
                    snippet: err
                }
            })
            res.end()
        }else{
            let list = {
                id:info.id,
                title:info.title,
                url:info.url,
                thumbnail:info.thumbnail,
                description:info.description,
                _filename:info._filename,
                format_id:info.format_id,
                duration:info.duration,
                size:info.size
            }
            res.json({
                response: {
                    code: 201,
                    message: 'Convert link susses !!',
                    snippet: list
                }
            })
            res.end()
        }

      
    })
}