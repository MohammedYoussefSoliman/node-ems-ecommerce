import { check } from 'express-validator'
import { validator } from '@middleware'

import { generalCategoryValidator } from './commonValidators'

const createCategoryNameValidator = check('name')
  .notEmpty()
  .withMessage('Category name is required')
  .isLength({ min: 2 })
  .withMessage('Category name length is too short')
  .isLength({ max: 32 })
  .withMessage('Category name length is too long')

const createSubCategoryCategoryValidator = check('category')
  .notEmpty()
  .withMessage('subCategory must belong to a category')
  .isMongoId()
  .withMessage('invalid subCategory Id')

export const getSubCategoryValidators = [generalCategoryValidator(), validator]
export const deleteSubCategoryValidators = [
  generalCategoryValidator(),
  validator,
]

export const createSubCategoryValidators = [
  createCategoryNameValidator,
  createSubCategoryCategoryValidator,
  validator,
]
