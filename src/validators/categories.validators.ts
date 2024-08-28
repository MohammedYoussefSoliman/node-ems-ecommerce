import { check } from 'express-validator'
import { validator } from '@middleware'

import { generalCategoryValidator } from './commonValidators'

const createCategoryValidator = check('name')
  .notEmpty()
  .withMessage('Category name is required')
  .isLength({ min: 2 })
  .withMessage('Category name length is too short')
  .isLength({ max: 32 })
  .withMessage('Category name length is too long')

export const getCategoryValidators = [generalCategoryValidator(), validator]
export const deleteCategoryValidators = [generalCategoryValidator(), validator]

export const createCategoryValidators = [createCategoryValidator, validator]
