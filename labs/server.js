
var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8000);
  app.use(express.logger(''));
  app.use(app.router);
  app.use(express.static(__dirname));
});

app.get(/\/$/, function (req, res) {
  var localPath = __dirname + req.path, 
    isFolder = function (filename) {
      return fs
              .statSync(localPath + filename)
              .isDirectory();
    };
  if(fs.existsSync(localPath)) {
    var response = '<h1>Files in ' + req.path + '</h1>' + 
      '<ul>',
      files = fs.readdirSync(localPath).sort();
    
    if(req.path !== '/') {
      var parent = req.path.match(/(.*)\/[^\/]+\/$/)[1] + '/';
      response += '<li><h3><a href="' + parent + '">Parent folder</a></h3></li>'
    }
    files.forEach(function (file) {

      if(isFolder(file)) {
       response += '<li><a href="' + req.path + file + '/">' +
          file + '/</a></li>';
      }
    });
    files.forEach(function (file) {

      if(!isFolder(file)) {
       response += '<li><a href="' + req.path + file + '">' +
          file + '</a></li>';
      }
    });
    
    response += '</ul>';
  }
  res.send(response);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
