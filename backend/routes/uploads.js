const cors = require('cors');

module.exports = function(app,formidable){

    app.post('/upload', (req,res) => {
        var form = new formidable.IncomingForm({ uploadDir: '../src/assets/img'});
        form.keepExtensions = true;

        form.on('error', function(err) {
            throw err;
            res.send({
                result:"failed",
                data:{},
                numberOfImages:0,
                message:"Cannot upload images. error is :" + err
            });
        });


        form.on('fileBegin', function(name,file){
            file.path = form.uploadDir + "/" + file.name;
        });


        form.on('file', function(field, file) {
            res.send({
                result: 'OK',
                data: {'filename': file.name, 'size': file.size},
                numberOfImages:1,
                message:"upload succesful"
            });
        })

        form.parse(req);
    })


 
}