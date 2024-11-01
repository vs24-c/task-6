import fs from 'fs/promises';
import settings from '../settings.json' assert {type: 'json'};

class UserManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async loadUserList() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await this.saveUserList([]);
        return [];
      } else {
        throw new Error(`Error reading user list: ${error.message}`);
      }
    }
  }

  async saveUserList(users) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(users, null, 2), 'utf-8');
    } catch (error) {
      throw new Error(`Error saving user list: ${error.message}`);
    }
  }

  async getUsById(id) {
    const data = await this.loadUserList();
    const user = data.find((user) => user.id == id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async userUpdateById(id, upOb) {
    const data = await this.loadUserList();
    const index = data.findIndex((el) => el.id == id);
    if (index === -1) {
      throw new Error(`User with id ${id} not found`);
    }
    data[index] = {...data[index], ...upOb};
    await this.saveUserList(data);
    return data;
  }

  async addUser(user) {
    const data = await this.loadUserList();
    if (!user) {
      throw new Error('Error request object');
    }
    data.push(user);
    await this.saveUserList(data);
    return data;
  }

  async userDeleteById(id) {
    const data = await this.loadUserList();
    const index = data.findIndex((item) => item.id == id);

    if (index === -1) {
      throw new Error(`User with id ${id} not found`);
    }

    data.splice(index, 1);
    await this.saveUserList(data);
    return data;
  }
}

export default new UserManager(settings.failPath);
