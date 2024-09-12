import {body} from 'express-validator'
import {inputCheckErrorsMiddleware} from '../../../common/middleware/inputCheckErrorsMiddleware'


//login: string //min 3 max 10 pattern ^[a-zA-Z0-9_-]*$
//password: string // min 6 max 20
//email: string // pattern: ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$

export const loginValidator = body('login').isString().withMessage('Login must be a string')
    .trim().isLength({ min: 3, max: 10 }).withMessage('Login must be between 3 and 10 characters long')
    .matches(/^[a-zA-Z0-9_-]*$/).withMessage('Login must contain only letters, numbers, underscores, and hyphens')

export const passwordValidator = body('password').isString().withMessage('Password must be a string')
    .trim().isLength({ min: 6, max: 20 }).withMessage('Password must be between 6 and 20 characters long')
export const emailValidator = body('email').isString().withMessage('Email must be a string')
    .trim().isEmail().withMessage('Email must be a valid email address')

export const userValidators = [
    loginValidator,
    passwordValidator,
    emailValidator,

    inputCheckErrorsMiddleware,
]