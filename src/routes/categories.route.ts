import { Router } from 'express'

import {
  addCategory,
  getCategories,
  getCategory,
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
  .get('/', paginationHandler<ICategory>(CategoriesModel), getCategories)
  .get('/:id', ...getCategoryValidators, getCategory)
  .post('/', ...createCategoryValidators, addCategory)
  .put('/:id', ...getCategoryValidators, updateCategory)
  .delete('/:id', ...deleteCategoryValidators, deleteCategory)
