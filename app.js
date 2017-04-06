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

app.all('/favicon.ico', function (req, res) {
    res.sendFile('favicon.ico', {root: __dirname + '/'});
});

app.use('/demo', function (req, res) {
    res.redirect(config.get('bigScreenDemo'));
});

app.all('/admin*', function (req, res) {
    res.redirect('https://admin.screen4fans.com')
});


function isFromDomain(headers, domain) {
    return (headers && headers.host && headers.host.indexOf(domain) >= 0)
}

app.all('*', function (req, res) {
    var headers = req.headers;

    if (isFromDomain(headers, 'pgeturow.mobi')) {
        res.redirect('https://screen4fans.com/zgorzelec1');
    } else if (isFromDomain(headers, 'gkskatowice.mobi')) {
        res.redirect('https://screen4fans.com/gkskatowice');
    } else if (isFromDomain(headers, 'lisbon.screen4fans.com')) {
        res.redirect('https://screen4fans.com/demo-vote');
    } else if (!req.url || req.url === '/') {
        res.redirect('https://info.screen4fans.com')
    } else {
        res.render(config.get('index'), frontendConfig);
    }
});

var server = http.listen(config.get('server.port'), function () {
    var host = server.address().address;
    var port = server.address().port;

    console.info(host, port, 'connected to db succesfully');
});