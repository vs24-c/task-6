import User from '../models/modelUser.mjs';
import {validationResult} from 'express-validator';

class UserController {
  static async userList(req, res) {
    try {
      const userList = await User.listUsersLoad();
      res.render('userList', {
        user: userList,
      });
    } catch (error) {}
  }

  static async formRegistr(req, res) {
    try {
      const id = req.params.id;
      let user = null;
      if (id) {
        user = await User.getUserById(id);
      }
      res.render('registrForm', {
        user: user,
        errors: [],
        title: 'Registr form',
      });
    } catch (error) {}
  }

  static async userReg(req, res) {
    const errors = validationResult(req);    
    if (!errors.isEmpty()) {
      const user = req.body;
      if (req.params.id) user.id = req.params.id;
      return res.status(400).render('registrForm', {
        errors: errors.array(),
        user,
        title: 'Registr form',
      });
    }

    const { name, surname, age, email} = req.body;

    try {
      if (req.params.id) {
        await User.upDataUser(req.params.id, {name, surname, age, email});
      } else {
        await User.createUser({name, surname, age, email});
        return res.redirect('/');
      }
      return res.redirect('/');
    } catch (error) {
      return res.status(500).send('Error occurred while processing the request');
    }
  }

  static async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const arrUse = await User.userDel(id);
      return res.render('userList', {
        user: arrUse,
      });
    } catch (error) {
      throw new Error(`Error don't know why: ${error.message}`);
    }
  }
}

export default UserController;
