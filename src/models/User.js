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

    $formatDatabaseJson(json) {
        json = super.$formatDatabaseJson(json);
  
        const curriedReduceWithReference = R.curry(snakeCaseReducerWithReference);
        const reducerFn = curriedReduceWithReference(R.__, R.__, json);
        return R.reduce(reducerFn, {}, Object.keys(json));
    }

    $parseDatabaseJson(json) {
        
        const curriedReduceWithReference = R.curry(camelCaseReducerWithReference);
        const reducerFn = curriedReduceWithReference(R.__, R.__, json);
        return super.$parseDatabaseJson(R.reduce(reducerFn, {}, Object.keys(json)));
    }
};

