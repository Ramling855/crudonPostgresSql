const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '777888999',
    port: 5432, // or your PostgreSQL port
});

module.exports = pool;
