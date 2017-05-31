
exports.up = function(knex, Promise) {

    return knex.schema.createTableIfNotExists('users', table => {
        table.increments('id').primary();
        table.string('firstName');
        table.string('lastName');
        table.string('hashedPassword');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {

    return knex.schema.dropTableIfExists('users');
};
