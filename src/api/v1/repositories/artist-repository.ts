import pool from '../../../config/database-connection';

class ArtistRepository {
    async getArtist(id: number) {
        return await pool.query('SELECT * FROM public.artists WHERE id=$1;',[id])
            .then(res => res)
            .catch(err => err);
    }

    async getArtists() {
        return await pool.query('SELECT * FROM public.artists;')
            .then(res => res)
            .catch(err => console.log(err.message));
    }

    async createArtist(name: string, nationality: string, music_styles: string) {
        return await pool.query('INSERT INTO public.artists(name, nationality, music_styles) VALUES ($1, $2, $3) returning id;',
            [name, nationality, music_styles])
            .then(res => res)
            .catch(err => err);
    }

    async updateArtist(id: number, name: string, nationality: string, music_styles: string) {
        return await pool.query('UPDATE public.artists set name=$1, nationality=$2, music_styles=$3 WHERE id=$4;',
            [name, nationality, music_styles, id])
            .then(res => res)
            .catch(err => console.log(err));
    }

    async deleteArtist(id: number) {
        return await pool.query('DELETE FROM public.artists WHERE id=$1;',
            [id])
            .then(res => res)
            .catch(err => console.log(err));
    }
}

export const artistRepository = new ArtistRepository();


