
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



var css = '<style> ul {list-style: none;} a {padding-left: 18px;} .folder { background:' +
          'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAd5JREFUeNqMU79rFUEQ/vbuodFEEkzAImBpkUabFP4ldpaJhZXYm/RiZWsv/hkWFglBUyTIgyAIIfgIRjHv3r39MePM7N3LcbxAFvZ2b2bn22/mm3XMjF+HL3YW7q28YSIw8mBKoBihhhgCsoORot9d3/ywg3YowMXwNde/PzGnk2vn6PitrT+/PGeNaecg4+qNY3D43vy16A5wDDd4Aqg/ngmrjl/GoN0U5V1QquHQG3q+TPDVhVwyBffcmQGJmSVfyZk7R3SngI4JKfwDJ2+05zIg8gbiereTZRHhJ5KCMOwDFLjhoBTn2g0ghagfKeIYJDPFyibJVBtTREwq60SpYvh5++PpwatHsxSm9QRLSQpEVSd7/TYJUb49TX7gztpjjEffnoVw66+Ytovs14Yp7HaKmUXeX9rKUoMoLNW3srqI5fWn8JejrVkK0QcrkFLOgS39yoKUQe292WJ1guUHG8K2o8K00oO1BTvXoW4yasclUTgZYJY9aFNfAThX5CZRmczAV52oAPoupHhWRIUUAOoyUIlYVaAa/VbLbyiZUiyFbjQFNwiZQSGl4IDy9sO5Wrty0QLKhdZPxmgGcDo8ejn+c/6eiK9poz15Kw7Dr/vN/z6W7q++091/AQYA5mZ8GYJ9K0AAAAAASUVORK5CYII=") ' +
          'no-repeat 0 0; }</style>'

app.get(/\/$/, function (req, res) {
  var localPath = __dirname + req.path, 
    isFolder = function (filename) {
      return fs
              .statSync(localPath + filename)
              .isDirectory();
    },
    response = css;
  if((fs.existsSync && fs.existsSync(localPath)) || (path.existsSync && path.existsSync(localPath))) {
    response += '<h1>Files in ' + req.path + '</h1>' + 
      '<ul>',
      files = fs.readdirSync(localPath).sort();
    
    if(req.path !== '/') {
      var parent = req.path.match(/(.*)\/[^\/]+\/$/)[1] + '/';
      response += '<li><h3><a class="folder" href="' + parent + '">Parent folder</a></h3></li>'
    }
    files.forEach(function (file) {

      if(isFolder(file)) {
       response += '<li><a class="folder" href="' + req.path + file + '/">' +
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
