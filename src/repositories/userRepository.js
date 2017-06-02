'use strict';

const User = require('../models/User');


const filterKeys = (allowed, obj) => R.pipe(
    R.toPairs,
    R.filter(R.apply((key) => R.contains(key, allowed))),
    R.fromPairs
)(obj);

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
 * Updates user
 * @param {object} newProps - user properties to update
 * @return User
 */
exports.update = (user, newProps) => {

    //check newProps?
    return User.query().patch(newProps).where('id', user instanceof User ? user.id : user).returning('*');
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

/**
 * Return a user by email
 * @param {string} email - user email
 * @return User
 */
exports.findUserByEmail = (email) => {

    return User.query().where('email', email);
}