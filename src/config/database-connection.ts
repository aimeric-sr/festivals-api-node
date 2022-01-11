import { Pool} from 'pg';
//use .env variable
const pool = new Pool();

module.exports = pool;