require('./utils/functional');

const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment-timezone');
const util = require('util');

import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

const config = require('./config');
const dbModule = require('./modules/dbModule');
const routeModule = require('./modules/routeModules');

const devPort = 4000;

global.app = new express();
global.baseUrl = process.env.NODE_ENV === 'ec2' ? `http://ec2-18-225-32-252.us-east-2.compute.amazonaws.com:${config.server.port}`
: `http://localhost:${config.server.port}`;

function processRun() {
    (async () => {
        app.set('port', process.env.PORT || config.server.port);
        app.use(bodyParser.json({limit: '15mb'}));
        app.use(bodyParser.urlencoded({ extended: true, limit: '15mb' }));

        app.use('/', express.static(path.join(__dirname, './../public')));

        dbModule.Init();
        routeModule.Init();

        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname+'./../public/index.html'));
        });
    })().then(_ => {
        http.createServer(app).listen(app.get('port'), () => {
            console.log(util.format('[Logger]::[Process On]::[Pid:%d]::[Server Running At %d]::[%s]::[Started]',
                                process.pid,
                                config.server.port,
                                moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')));
        });
    });
};

if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const configDev = require('../webpack.dev.config');
    const compiler = webpack(configDev);
    const devServer = new WebpackDevServer(compiler, configDev.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}

/* handle error */
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

processRun();