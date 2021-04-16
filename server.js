'use strict';

const express = require('express');
const app = express();

const redis = require('redis');
const client = redis.createClient({
    host: 'redis',
    port: 6379
});

app.get('/', (req, res) => {
    client.incr('hits');
    client.get('hits', (err, hit) => {
        if (err) throw err;
        res.send(`Hits: ${hit}`);
    });
});

const port = 8080;
module.exports = server
var server = app.listen(port, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});
