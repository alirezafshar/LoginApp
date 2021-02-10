
exports.up = function(knex) {
  return knex.schema.createTable("userinfo", table => {
    table.increments("id").primary();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("imgurl").notNullable();
    table.timestamp("create_at_userinfo").defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("userinfo")
};
