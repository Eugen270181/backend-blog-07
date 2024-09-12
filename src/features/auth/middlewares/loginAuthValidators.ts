import {body} from 'express-validator'
import {inputCheckErrorsMiddleware} from '../../../common/middleware/inputCheckErrorsMiddleware'

export const loginOrEmailValidator = body('loginOrEmail').isString().withMessage('not string')
export const passwordValidator = body('password').isString().withMessage('not string')

export const loginAuthValidators = [
    loginOrEmailValidator,
    passwordValidator,

    inputCheckErrorsMiddleware,
]