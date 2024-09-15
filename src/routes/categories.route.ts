import { Router } from 'express'

import {
  addCategory,
  addSubCategory,
  getCategories,
  getCategory,
  getSubCategories,
  updateCategory,
  deleteCategory,
} from '@controllers'
import { ICategory } from 'types'
import { paginationHandler, adjustAddSubCategoryMiddleware } from '@middleware'
import { CategoriesModel } from '@models'
import {
  getCategoryValidators,
  deleteCategoryValidators,
  createCategoryValidators,
} from '@validators'

export const categoryRouter = Router()

categoryRouter
  .get(
    '/',
    paginationHandler<ICategory>(
      CategoriesModel,
      (model, limit, skip, filteredOptions) =>
        model
          .find(filteredOptions.filter)
          .sort(filteredOptions.sort)
          .select(filteredOptions.select)
          .populate('subCategories')
          .limit(limit)
          .skip(skip)
          .exec()
    ),
    getCategories
  )
  .get('/:id', ...getCategoryValidators, getCategory)
  .get('/:categoryId/sub-categories', getSubCategories)
  .post(
    '/:categoryId/sub-categories',
    adjustAddSubCategoryMiddleware,
    addSubCategory
  )
  .post('/', ...createCategoryValidators, addCategory)
  .put('/:id', ...getCategoryValidators, updateCategory)
  .delete('/:id', ...deleteCategoryValidators, deleteCategory)
