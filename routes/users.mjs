import {Router} from 'express';
import UserController from '../controller/userController.mjs';
import UserValidator from '../models/userValidate.mjs';
import { checkSchema } from 'express-validator';

const router = Router();

router.get('/', UserController.userList);

router.get('/registration/:id?', UserController.formRegistr);

router.post('/registration/:id?', checkSchema(UserValidator.validateShema), UserController.userReg);

router.delete('/users/:id', UserController.deleteUser);

export default router;
