import { User } from '../types/user.types';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import zxcvbn from 'zxcvbn';

class UserModel {
  private users: User[] = [];

  findAll() {
    return this.users.map(({ password, ...u }) => u);
  }

  findById(id: string) {
    return this.users.find((u) => u.id === id);
  }

  findByUsername(username: string) {
    return this.users.find(
      (u) => u.username.toLocaleLowerCase() === username.toLocaleLowerCase(),
    );
  }

  async add(fullname: string, username: string, password: string) {
    const found = this.findByUsername(username);
    if (found) return null;

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = {
      id: uuidv4(),
      fullname,
      username,
      password: hashedPassword,
    };
    this.users.push(newUser);
    return newUser;
  }

  async login(username: string, password: string) {
    const user = this.findByUsername(username);
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }

  async update(id: string, changes: Partial<User>) {
    const founIndex = this.users.findIndex((u) => u.id === id);
    if (founIndex === -1) {
      return null;
    }

    if (changes.username) {
      const taken = this.users.find(
        (u) =>
          u.username.toLowerCase() === changes.username!.toLowerCase() &&
          u.id !== id,
      );
      if (taken) {
        return 'taken';
      }
    }

    if (changes.password) {
      changes.password = await bcrypt.hash(changes.password, 12);
    }

    this.users[founIndex] = {
      ...this.users[founIndex],
      ...changes,
    };
    return this.users[founIndex];
  }

  deleteById(id: string): boolean {
    const initial = this.users.length;
    this.users = this.users.filter((u) => u.id !== id);
    return this.users.length < initial;
  }
}

export default new UserModel();
