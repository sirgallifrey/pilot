'use strict';

const DB = require('./db');
const UserRepository = require('./repositories/userRepository');

DB.init();

UserRepository.create({ firstName: 'Adilson'}).then(user => {

    return UserRepository.findUserById(user.id)
}).then(user => {

    console.log('the user:', user);
});



