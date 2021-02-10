require("dotenv").config()

const USER = process.env.USER;
const PASS = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;
const HOST = process.env.HOST || "localhost";

module.exports = {

  development: {
    client: "mysql",
    connection: {
      host: HOST,
      database: DATABASE,
      user: USER,
      password: PASSWORD,
      charset: "utf8"
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: HOST,
      database: DATABASE,
      user: USER,
      password: PASSWORD,
      charset: "utf8"
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};
