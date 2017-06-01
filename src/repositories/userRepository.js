'use strict';

const User = require('../models/User');

/**
 * Creates new user
 * @param {object} userProps - user properties
 * @return User
 */
exports.create = (userProps) => {

    //NOTE: is useful to validate userProps or let the error flow from the db?
    return User.query().insert(userProps);
};

/**
 * Match all users with firstName
 * @param {string} name - user first name
 * @return [User]
 */
exports.findUsersWithFirstName = (name) => {

    return User.query().where('first_name', name);
}

/**
 * Return a user by id
 * @param {string|number} id - user id
 * @return User
 */
exports.findUserById = (id) => {

    return User.query().where('id', id);
}
