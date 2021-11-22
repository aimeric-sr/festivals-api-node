const { Pool} = require('pg');
//use .env variable
const pool = new Pool();

module.exports = pool;