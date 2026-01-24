const {Pool} = require("pg");
require("dotenv").config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const database = process.env.DATABASE;
const password = process.env.PASSWORD;
const port = process.env.PORT;

module.exports = new Pool({
    host: host,
    user: user,
    database: database,
    password: password,
    port: port
});