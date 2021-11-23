const pool = require('../../../config/database-connection');

class AuthRepository {
    async getUserByUsername(username) {
        return await pool.query('SELECT * FROM public.users WHERE username=$1;',[username])
            .then(res => res)
            .catch(err => console.log(err.message));
    }
}

module.exports = new AuthRepository();