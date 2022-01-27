import {artistRepository} from '../repositories/artist';

class ArtistService {
    async getArtist(id: number) {
        return artistRepository.getArtist(id);
    }

    async getArtists() {
        return artistRepository.getArtists();
    }

    async createArtist(name: string, nationality: string, music_styles: string) {
        return artistRepository.createArtist(name, nationality, music_styles);
    }

    async updateArtist(id: number, name: string, nationality: string, music_styles: string) {
        return artistRepository.updateArtist(id, name, nationality, music_styles);
    }

    async deleteArtist(id: number) {
        return artistRepository.deleteArtist(id);
    }
}

export const artistService = new ArtistService();
