import { DBConnectionHandler } from '../../../DBConnection/FestivalsDatabase/DBConnectionHandler';
const pool = DBConnectionHandler.getInstance().getAdminPoolConnection;
class AuthRepository {
    async getUserByUsername(username: string) {
        return await pool.query('SELECT * FROM mobile_app.users LEFT JOIN mobile_app.roles ON users.role=roles.id WHERE username=$1;',[username])
            .then(res => res)
            .catch(err => console.log(err.message));
    }

    async getUuidRole(roleName: string) {
        return await pool.query('SELECT id FROM mobile_app.roles WHERE name=$1;',[roleName])
            .then(res => res)
            .catch(err => console.log(err.message));
    }

    async createToken(refreshToken: string) {
    return await pool.query('INSERT INTO mobile_app.refresh_token(token_value) VALUES ($1);',[refreshToken])
            .then(res => res)
            .catch(err => console.log(err.message));
    }

    async searchRefreshToken(refreshToken: string) {
        return await pool.query('SELECT * FROM mobile_app.refresh_token WHERE token_value=$1;',[refreshToken])
            .then(res => res)
            .catch(err => console.log(err.message));
    }

    async deleteRefreshToken(refreshTokenDel: string) {
        return await pool.query('DELETE FROM mobile_app.refresh_token WHERE token_value=$1 returning id;',[refreshTokenDel])
            .then(res => res)
            .catch(err => console.log(err.message));
    }
}

export const authRepository = new AuthRepository();