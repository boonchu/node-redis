'use strict';

const express = require('express');
const app = express();

// https://dzone.com/articles/tutorial-working-nodejs-and
const redis = require('redis');
const client = redis.createClient({ host: 'redis', port: 6379 });
// https://stackoverflow.com/questions/57383470/redis-connection-lost-without-any-indication
client.on("connect", function () {
    client.stream.setKeepAlive(true, 10000);
});
client.on("error", function (err) {
    console.log("Error " + err);
});

app.get('/', (req, res) => {
    client.incr('hits');
    client.get('hits', (err, hit) => {
        if (err) throw err;
        res.send(`Hits: ${hit}`);
    });
});

// Set service port
const port = process.env.PORT || 8080;
// Start service
const server = app.listen(port, () => {
    var host = server.address().address;
    console.log('App listening at http://%s:%s', host, port);
});

// https://stackoverflow.com/questions/33986863/mocha-api-testing-getting-typeerror-app-address-is-not-a-function
module.exports = {
    server
}
