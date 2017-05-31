'use strict';

const DB = require('./db');
const User = require('./models/User');

DB.init();

User.query().insert({
    firstName: 'João',
    lastName: 'José',
    hashedPassword: '123321'
}).then(user => {

    console.log('created:', user.firstName, 'id:', user.id);
    // Fetch all people named Sylvester.
    return User.query().where('firstName', 'João');

}).then(jooes => {

    console.log('joões:', jooes);

});


