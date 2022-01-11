const userRepository = require('../../../../../../../../../../Downloads/festivals-api-node-master-3/src/api/v1/repositories/user-repository');
const bcrypt = require('bcryptjs');

class UserService {
    async getUser(id) {
        return userRepository.getUser(id);
    }

    async getUserIncluding(id) {
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

    async createUser(username, password, email) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return userRepository.createUser(username, hashedPassword, email);
    }

    async updateUser(id, username, password, email) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return userRepository.updateUser(id, username, hashedPassword, email);
    }

    async deleteUser(id) {
        return userRepository.deleteUser(id);
    }
}

module.exports = new UserService();
