
exports.up = function(knex, Promise) {

    return knex.schema.createTableIfNotExists('users', table => {
        table.increments('id').primary();
        table.string('first_name');
        table.string('last_name');
        table.string('hashed_password');
        table.string('email').unique();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {

    return knex.schema.dropTableIfExists('users');
};
