//couche service, peu important pour l'instant mais devient indispensable si l'API devient plus complexe
const userRepository = require('../repositories/user-repository');

class UserService {
    async getUser(id) {
        return userRepository.getUser(id);
    }

    async getUsers() {
        return userRepository.getUsers();
    }

    async createUser(username, password, email) {
        return userRepository.createUser(username, password, email);
    }

    async updateUser(id, username, password, email) {
        return userRepository.updateUser(id, username, password, email);
    }

    async deleteUser(id) {
        return userRepository.deleteUser(id);
    }
}

module.exports = new UserService();
