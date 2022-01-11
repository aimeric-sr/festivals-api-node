import {followArtistRepository} from '../repositories/follow-artist-repository';

class FollowArtistService {
    async addFollowArtist(user_id: number, artist_id: number) {
        return followArtistRepository.addFollowArtist(user_id, artist_id);
    }

    async delFollowArtist(user_id: number, artist_id: number) {
        return followArtistRepository.delFollowArtist(user_id, artist_id);
    }
}

export const followArtistService = new FollowArtistService();
