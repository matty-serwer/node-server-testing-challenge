
exports.up = function(knex) {
  return knex.schema.createTable('beers', tbl => {
    tbl.increments();
    tbl.string('name', 128).unique().notNullable();
    tbl.integer('brand_id').notNullable();
    tbl.integer('style_id').notNullable();
    tbl.float('abv').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('beers');
};
