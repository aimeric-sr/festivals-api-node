import { Pool} from 'pg';
//use .env variable
export const pool = new Pool();

module.exports = pool;