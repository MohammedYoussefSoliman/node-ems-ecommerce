import { check } from 'express-validator'

export const generalValidator = (message: string = 'invalid category id') =>
  check('id').isMongoId().withMessage(message)
