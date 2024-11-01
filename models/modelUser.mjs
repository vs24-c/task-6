import userManager from './userManager.mjs';
import {v4 as uuidv4} from 'uuid';
class User {
  static listUsersLoad() {
    try {
      return userManager.loadUserList();
    } catch (error) {
      throw new Error('Error write list users');
    }
  }

  static getUserById(id) {
    try {
      return userManager.getUsById(id);
    } catch (error) {
      throw new Error('Error get user by id');
    }
  }

  static createUser(userData) {
    try {
      return userManager.addUser({id: uuidv4(), ...userData});
    } catch (error) {
      throw new Error('Error create user');
    }
  }

  static upDataUser(id, updatedUserData) {
    try {
      return userManager.userUpdateById(id, updatedUserData);
    } catch (error) {
      throw new Error('Error update user');
    }
  }

  static userDel(id) {
    try {
      return userManager.userDeleteById(id);
    } catch (error) {
      throw new Error('Error delete user');
    }
  }
}
export default User;
