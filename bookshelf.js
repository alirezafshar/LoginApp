const knexConfig = require("./knexfile");
const mysqlConfig = knexConfig[process.env.NODE_ENV || "development"];
const knex = require("knex")(mysqlConfig);
const bookshelf = require("bookshelf")(knex);

module.exports = bookshelf;