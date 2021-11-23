const userRepository = require('../repositories/user-repository');
const bcrypt = require('bcryptjs');

class UserService {
    async getUser(id) {
        return userRepository.getUser(id);
    }

    async getUsers() {
        return userRepository.getUsers();
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
