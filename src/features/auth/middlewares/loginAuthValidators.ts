import {body} from 'express-validator'
import {inputValidationMiddleware} from '../../../common/middleware/inputValidationMiddleware'

export const loginOrEmailValidator = body('loginOrEmail').isString().withMessage('not string')
export const passwordValidator = body('password').isString().withMessage('not string')

export const loginAuthValidators = [
    loginOrEmailValidator,
    passwordValidator,

    inputValidationMiddleware,
]