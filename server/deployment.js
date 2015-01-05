var express    = require("express");
var app        = express();
var bodyParser = require('body-parser');
var exec       = require('child_process').exec;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post('/payload', function(req, res) {
    var reqBody  = JSON.parse(req.body.payload);
    var cloneUrl = 'git@bitbucket.org:' + reqBody.repository.absolute_url;

    if (reqBody.commits[0].branch == 'master') {
        process.chdir('/tmp');
        exec('git clone ' + cloneUrl, function(error, stdout, stderr) {
            console.log(stdout);
        });
    }

    res.end();
});

app.listen(4567);