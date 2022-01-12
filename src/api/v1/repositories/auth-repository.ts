import pool from '../../../config/database-connection';

class AuthRepository {
    async getUserByUsername(username: string) {
        return await pool.query('SELECT * FROM public.users LEFT JOIN public.roles ON users.role=roles.id WHERE username=$1;',[username])
            .then(res => res)
            .catch(err => console.log(err.message));
    }

    async getUuidRole(roleName: string) {
        return await pool.query('SELECT id FROM public.roles WHERE name=$1;',[roleName])
            .then(res => res)
            .catch(err => console.log(err.message));
    }

    async createToken(refreshToken: string) {
    return await pool.query('INSERT INTO public.refresh_token(token_value) VALUES ($1);',[refreshToken])
            .then(res => res)
            .catch(err => console.log(err.message));
    }

    async searchRefreshToken(refreshToken: string) {
        return await pool.query('SELECT * FROM public.refresh_token WHERE token_value=$1;',[refreshToken])
            .then(res => res)
            .catch(err => console.log(err.message));
    }

    async deleteRefreshToken(refreshTokenDel: string) {
        return await pool.query('DELETE FROM public.refresh_token WHERE token_value=$1 returning id;',[refreshTokenDel])
            .then(res => res)
            .catch(err => console.log(err.message));
    }
}

export const authRepository = new AuthRepository();