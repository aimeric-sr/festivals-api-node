import { UserRepository } from '../repositories/user';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';

class UserService {
    private userRepository = new UserRepository();

    async getUser(id: number) {
        return this.userRepository.getUser(id);
    }

    async getUserIncluding(id: number) {
        return this.userRepository.getUserIncluding(id);
    }

    async getUsers() {
        return this.userRepository.getUsers();
    }

    async getUsersIncludingArtists() {
        return this.userRepository.getUsersIncludingArtists();
    }

    async getUsersIncludingEvents() {
        return this.userRepository.getUsersIncludingEvents();
    }

    async getUsersIncluding() {
        return this.userRepository.getUsersIncluding();
    }

    async createUser(pool: Pool, username: string, password: string, email: string) {

        
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.userRepository.createUser(pool, username, hashedPassword, email);
    }

    async updateUser(id: number, username: string, password: string, email: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.userRepository.updateUser(id, username, hashedPassword, email);
    }

    async deleteUser(id: number) {
        return this.userRepository.deleteUser(id);
    }
}

export const userService = new UserService();
