import {body} from 'express-validator';

class UserValidator {
  static validateUser = [
    body('name')
      .trim()
      .escape()
      .isLength({min: 3, max: 10})
      .withMessage('Name must be between 3 and 10 characters long.')
      .notEmpty()
      .withMessage('Name is required.'),

    body('surname')
      .trim()
      .escape()
      .isLength({min: 3, max: 15})
      .withMessage('Surname must be between 3 and 15 characters long.')
      .notEmpty()
      .withMessage('Surname is required.'),

    body('email')
      .trim()
      .escape()
      .normalizeEmail()
      .isEmail()
      .withMessage('Please provide a valid email address.'),

    body('age')
      .trim()
      .escape()
      .isNumeric()
      .withMessage('Age must be a number.')
      .isInt({min: 6, max: 120})
      .withMessage('Age must be between 6 and 120.'),
  ];

  static validateShema = {
    name: {
      isLength: {
        options: {min: 3, max: 10},
        errorMessage: 'Name must be between 3 and 10 characters long.',
      },
      notEmpty: {
        errorMessage: 'Name is required.',
      },
    },
    surname: {
      isLength: {
        options: {min: 3, max: 15},
        errorMessage: 'Surname must be between 3 and 15 characters long.',
      },
      notEmpty: {
        errorMessage: 'Surname is required.',
      },
    },
    email: {
      isEmail: {
        errorMessage: 'Please provide a valid email address.',
      },
    },
    age: {
      isNumeric: {
        errorMessage: 'Age must be a number.',
      },
      isInt: {
        options: {min: 6, max: 120},
        errorMessage: 'Age must be between 6 and 120.',
      },
    },
    trim: true,
    escape: true,
  };
}

export default UserValidator;
