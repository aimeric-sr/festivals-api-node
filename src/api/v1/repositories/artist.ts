import { DBConnectionHandler } from '../../../DBConnection/FestivalsDatabase/DBConnectionHandler';
const pool = DBConnectionHandler.getInstance().getAdminPoolConnection;

class ArtistRepository {
    async getArtist(id: number) {
        return await pool.query('SELECT * FROM mobile_app.artists WHERE id=$1;',[id])
            .then(res => res)
            .catch(err => err);
    }

    async getArtists() {
        return await pool.query('SELECT * FROM mobile_app.artists;')
            .then(res => res)
            .catch(err => console.log(err.message));
    }

    async createArtist(name: string, nationality: string, music_styles: string) {
        return await pool.query('INSERT INTO mobile_app.artists(name, nationality, music_styles) VALUES ($1, $2, $3) returning id;',
            [name, nationality, music_styles])
            .then(res => res)
            .catch(err => err);
    }

    async updateArtist(id: number, name: string, nationality: string, music_styles: string) {
        return await pool.query('UPDATE mobile_app.artists set name=$1, nationality=$2, music_styles=$3 WHERE id=$4;',
            [name, nationality, music_styles, id])
            .then(res => res)
            .catch(err => console.log(err));
    }

    async deleteArtist(id: number) {
        return await pool.query('DELETE FROM mobile_app.artists WHERE id=$1;',
            [id])
            .then(res => res)
            .catch(err => console.log(err));
    }
}

export const artistRepository = new ArtistRepository();


