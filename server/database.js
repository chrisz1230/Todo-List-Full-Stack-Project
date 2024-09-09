const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "CHRIS1230zzy_zzy",
    host: "localhost",
    port: 5432,
    database: "todolist"
});

module.exports = pool;