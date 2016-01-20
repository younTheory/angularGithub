var express = require('express');

// Port listening
var appListenOnPortConfig = process.env.PORT || 8080;

// config of express
var app = express();

// Binding the listening socket
var server = app.listen(appListenOnPortConfig, function () {
  console.log('Express server listening on port ' + appListenOnPortConfig);
});


// Static pages (such as angularjs, css and client-side js) are statically served
app.use('/', express.static(__dirname + '/angular'));