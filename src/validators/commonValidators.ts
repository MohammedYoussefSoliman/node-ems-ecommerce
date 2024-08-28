import { check } from 'express-validator'

export const generalCategoryValidator = (
  message: string = 'invalid category id'
) => check('id').isMongoId().withMessage(message)
