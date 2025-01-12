import { validator } from '@middleware'
import { slugHandler } from '@utils'
import { generalValidator } from './commonValidators'

const createCategoryValidator = slugHandler('name')
  .withMessage('Category name is required')
  .isLength({ min: 2 })
  .withMessage('Category name length is too short')
  .isLength({ max: 32 })
  .withMessage('Category name length is too long')

export const getCategoryValidators = [generalValidator(), validator]
export const deleteCategoryValidators = [generalValidator(), validator]
export const updateCategoryValidator = [
  generalValidator(),
  validator,
  slugHandler('name').optional(),
]
export const createCategoryValidators = [createCategoryValidator, validator]
