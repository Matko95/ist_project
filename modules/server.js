let express = require('express'),
    config  = require('./config'),
    api     = require('./api'),
    path    = require('path'),
    server;

// Create the HTTP server (Express 3.0 version)
server = express();

// Apply the configuration
config.applyConfiguration(server);

// Add the api routes
api.applyRoutes(server);

server.use('/public', express.static(__dirname + '/public'));

server.get('/*', function(req, res){
    res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

// Some initialization or whatever can go here...

// Export the server
module.exports = server;