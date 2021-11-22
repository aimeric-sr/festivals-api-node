const pool = require('../../../config/database-connection');

class UserRepository {
    async getUser(id) {
        return await pool.query('SELECT * FROM public.users WHERE id=$1;',[id])
            .then(res => res)
            .catch(err => console.log(err.message));
    }

    async getUsers() {
        return await pool.query('SELECT * FROM public.users;')
            .then(res => res)
            .catch(err => console.log(err.message));
    }

    async createUser(username, password, email) {
        return await pool.query('INSERT INTO public.users(username, password, email) VALUES ($1, $2, $3);',
            [username, password, email])
            .then(res => res)
            .catch(err => console.log(err));
    }

    async updateUser(id, username, password, email) {
        return await pool.query('UPDATE public.users set username=$1, password=$2, email=$3 WHERE id=$4;',
            [username, password, email, id])
            .then(res => res)
            .catch(err => console.log(err));
    }

    async deleteUser(id) {
        return await pool.query('DELETE FROM public.users WHERE id=$1;',
            [id])
            .then(res => res)
            .catch(err => console.log(err));
    }
}

module.exports = new UserRepository();
