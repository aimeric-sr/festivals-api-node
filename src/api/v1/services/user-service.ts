const userRepository = require('../../../../../../../../../../Downloads/festivals-api-node-master-3/src/api/v1/repositories/user-repository');
import bcrypt from 'bcryptjs';

class UserService {
    async getUser(id: number) {
        return userRepository.getUser(id);
    }

    async getUserIncluding(id: number) {
        return userRepository.getUserIncluding(id);
    }

    async getUsers() {
        return userRepository.getUsers();
    }

    async getUsersIncludingArtists() {
        return userRepository.getUsersIncludingArtists();
    }

    async getUsersIncludingEvents() {
        return userRepository.getUsersIncludingEvents();
    }

    async getUsersIncluding() {
        return userRepository.getUsersIncluding();
    }

    async createUser(username: string, password: string, email: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return userRepository.createUser(username, hashedPassword, email);
    }

    async updateUser(id: number, username: string, password: string, email: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return userRepository.updateUser(id, username, hashedPassword, email);
    }

    async deleteUser(id: number) {
        return userRepository.deleteUser(id);
    }
}

export const userService = new UserService();
