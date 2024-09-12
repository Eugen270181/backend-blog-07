import {body} from 'express-validator'
import {inputCheckErrorsMiddleware} from '../../../common/middleware/inputCheckErrorsMiddleware'


//content: string //min 20 max 300

export const contentValidator = body('content').isString().withMessage('Login must be a string')
    .trim().isLength({ min: 20, max: 300 }).withMessage('Login must be between 20 and 300 characters long')


export const commentValidators = [
    contentValidator,

    inputCheckErrorsMiddleware
]