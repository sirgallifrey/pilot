'use strict';

const Hapi = require('hapi');
const DB = require('./db');
const server = new Hapi.Server();

server.connection({port: 3000});

DB.init();

server.register([
    {
        plugin: './api',
        options: {
            routes: {
                prefix: '/api'
            }
        }
    }
], (err) => {

    if (err) {
        throw err;
    }

    server.start((err) => {

        console.log(`Server has started at: ${server.info.url}`);
    });
});


