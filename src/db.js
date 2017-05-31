'use strict';

const objection = require('objection');
const Model = objection.Model;
const Knex = require('knex');
const KnexFile = require('../knexfile');

exports.init = () => {

    if (!Model.knex()) {
        const knex = Knex(KnexFile[process.env.NODE_ENV] || KnexFile['development']);
        Model.knex(knex);
    }
}