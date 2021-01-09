const Pool = require("pg").Pool

const pool = new Pool({
    user: 'lisalam',
    password: 'password123',
    host: 'localhost',
    port: 5432,
    database: 'photogal'
});

module.exports = pool