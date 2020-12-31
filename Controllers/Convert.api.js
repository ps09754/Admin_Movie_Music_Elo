
//< ===============================================>
const youtubedl = require('youtube-dl')

// Optional arguments passed to youtube-dl.

//<==========================================================>

exports._ConvertLink = async (req, res) => {
    // console.log('chay ne');
    const { video_id } = req.query
    const url = `https://www.youtube.com/watch?v=${video_id}`
    const options = ['-x', '--audio-format', 'mp3']

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

exports._convertList = async(req,res)=>{
    const { list } = req.query
    const options = ['-x', '--audio-format', 'mp3']
    console.log('list ',list);
    const listLink =  list.map((e)=> `https://www.youtube.com/watch?v=${e}` )
    youtubedl.getInfo(listLink, options, function (err, info) {
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
            res.json({
                response: {
                    code: 201,
                    message: 'Convert link susses !!',
                    snippet: info.map(e=>e.url)
                }
            })
            res.end()
        }
    })

}