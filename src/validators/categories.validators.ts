import { check } from 'express-validator'
import { validator } from '@middleware'

import { generalValidator } from './commonValidators'

const createCategoryValidator = check('name')
  .notEmpty()
  .withMessage('Category name is required')
  .isLength({ min: 2 })
  .withMessage('Category name length is too short')
  .isLength({ max: 32 })
  .withMessage('Category name length is too long')

export const getCategoryValidators = [generalValidator(), validator]
export const deleteCategoryValidators = [generalValidator(), validator]

export const createCategoryValidators = [createCategoryValidator, validator]
