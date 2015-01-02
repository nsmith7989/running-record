var express = require("express");
var multer = require('multer');
var app = express();
var done = false;
var exec = require('child_process').exec;
var fs = require('fs');


/*Configure the multer.*/

app.use(multer({
    dest: __dirname + '/uploads/',
    rename: function(fieldName) {
        return fieldName;
    },
    onFileUploadStart: function(file) {
        console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function(file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path);
        var child = exec('lame -b16 ' + file.path, function(err, stdout, stderr) {
            fs.unlink(file.path);
        });

        done = true;
    }
}));

app.use('/uploads', express.static(__dirname + '/uploads/'));


app.post('/api/audio', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(done == true) {
        console.log(req.files);
        res.end("File uploaded.");
    }
});


/*Run the server.*/
app.listen(8080);