'use strict';

const objection = require('objection');
const Model = objection.Model;

exports = module.exports = class User extends Model {
    static get tableName() {
        return 'users';
    }
};

