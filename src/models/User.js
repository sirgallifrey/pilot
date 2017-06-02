'use strict';

const objection = require('objection');
const Model = objection.Model;
const R = require('ramda');
var camelCase = require('lodash.camelcase');
var snakeCase = require('lodash.snakecase');

const snakeCaseReducerWithReference = (acc, key, ref) => {
    acc[snakeCase(key)] = ref[key];
    return acc;
};

const camelCaseReducerWithReference = (acc, key, ref) => {
    acc[camelCase(key)] = ref[key];
    return acc;
};

exports = module.exports = class User extends Model {

    static get tableName() {
        return 'users';
    }

    $beforeUpdate() {
        this.updated_at = new Date().toISOString();
    }

    $formatDatabaseJson(json) {
        json = super.$formatDatabaseJson(json);
        //TODO: refactor with this https://github.com/ramda/ramda/wiki/Cookbook#rename-keys-of-an-object
        const curriedReduceWithReference = R.curry(snakeCaseReducerWithReference);
        const reducerFn = curriedReduceWithReference(R.__, R.__, json);
        return R.reduce(reducerFn, {}, Object.keys(json));
    }

    $parseDatabaseJson(json) {
        //TODO: refactor with this https://github.com/ramda/ramda/wiki/Cookbook#rename-keys-of-an-object
        const curriedReduceWithReference = R.curry(camelCaseReducerWithReference);
        const reducerFn = curriedReduceWithReference(R.__, R.__, json);
        return super.$parseDatabaseJson(R.reduce(reducerFn, {}, Object.keys(json)));
    }
};

