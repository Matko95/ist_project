let path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors');


let config = {
    "secret": "secret-password"
};

// Export method to be compliant with Express 3.0
let applyConfiguration = function (app) {
        let rootDir = path.resolve(__dirname, '..');
        // parse application/json
        app.use(bodyParser.json());
        // parse application/x-www-form-urlencoded
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use(cors())

        app.maxConnections = 3;


        // Serve static content from "public" directory
        app.use(express.static(rootDir + '/public'));
};

exports.applyConfiguration = applyConfiguration;
exports.config = config;