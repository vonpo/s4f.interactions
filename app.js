const express = require('express');
const app = express();
const config = require('config');
const http = require('http').Server(app);
const staticFiles = require('./lib/static/router');
const poll = require('./lib/poll/router');
const frontendConfig = {
    config: {
        facebookApp: config.get('facebook.appId'),
        googleAnalyticsId: config.get('googleAnalyticsId'),
        nextVoteTime: config.get('nextVoteTime')
    }
};

require('./lib/channel/bootstrap').bootstrap(http);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/partials/');
app.use('/api/poll', poll);
app.use('/', staticFiles);
app.all('*', function (req, res) {
    res.render(config.get('index'), frontendConfig);
});

var server = http.listen(config.get('server.port'), function () {
    var host = server.address().address;
    var port = server.address().port;

    console.info(host, port, 'connected to db succesfully');
});