
exports.up = function(knex) {
    return knex.schema
        .createTable('athletes', tbl => {
            tbl.increments();
            tbl.string('name', 128).unique().notNullable();
            tbl.string('sport', 128).notNullable();
        });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('athletes');
};
