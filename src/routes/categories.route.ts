import { Router } from 'express'

import {
  addCategory,
  getCategories,
  getCategory,
  getSubCategories,
  updateCategory,
  deleteCategory,
} from '@controllers'
import { ICategory } from 'types'
import { paginationHandler } from '@middleware'
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
    paginationHandler<ICategory>(CategoriesModel, (model, limit, skip) =>
      model.find().populate('subCategories').limit(limit).skip(skip).exec()
    ),
    getCategories
  )
  .get('/:id', ...getCategoryValidators, getCategory)
  .get('/:categoryId/sub-categories', getSubCategories)
  .post('/', ...createCategoryValidators, addCategory)
  .put('/:id', ...getCategoryValidators, updateCategory)
  .delete('/:id', ...deleteCategoryValidators, deleteCategory)
