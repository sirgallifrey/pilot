'use strict';

const UserRepository = require('./repositories/userRepository');
const JWT = require('jsonwebtoken');
const Joi = require('joi');
const Boom = require('boom');
const Bcrypt = require('bcrypt');
const secret = 'NeverShareYourSecret';
const algorithm = 'HS256';

const makeJWT = function (user, jwtid) {

    const tokenOptions = {
        jwtid: jwtid,
        algorithm: algorithm
    };

    const payload = { user: user.toJSON(), scope: user.scope || [] };

    return JWT.sign(payload, secret, tokenOptions);
};

const hashPassword = (password) => {

    return Bcrypt.hash(password, 10);
}

const comparePassword = (password, hash) => {

    return Bcrypt.compare(password, hash);
}

exports.register = (plugin, options, next) => {

    // bring your own validation function
    var validate = function (decoded, request, callback) {

        // do your checks to see if the person is valid
        UserRepository.findUserById(decoded.id).then((user) => {

            if (user) {
                request.app.user = user;
                return callback(null, true);
            }
            return callback(null, false);
        }).catch(callback);
    };

    plugin.register(require('hapi-auth-jwt2'), function (err) {

        if (err) {
            console.log(err);
        }

        plugin.auth.strategy('jwt', 'jwt',
            {
                key: secret,//TODO: put this in a safe config somewhere
                validateFunc: validate,
                verifyOptions: { algorithms: [algorithm] }
            });

        plugin.auth.default('jwt');

        plugin.route([
            {
                method: 'POST', path: '/login',
                handler: function (request, reply) {
                    const user = UserRepository.findUserByEmail(request.payload.email);
                    const userIverified = user.then((user) => {
                        comparePassword(request.payload.password, user.hashedPassword)
                    }).then((verified) => {
                        if (verified) {
                            const jwt = makeJWT(user);
                            return reply({jwt}).header('Authorization', jwt);
                        }
                        return reply(Boom.unauthorized());
                    });
                },
                config: {
                    auth: false,
                    validate: {
                        payload: Joi.object().keys({
                            password: Joi.string(),
                            email: Joi.email()
                        })
                    }
                }
            }
        ]);
    });
}

exports.register.attributes = {
    name: 'auth',
    version: '0.0.1',
    once: true
}