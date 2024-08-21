import { Router } from 'express'

import {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from '@controllers'
import { ICategory } from '@interfaces'
import { paginationHandler } from '@middleware'
import { CategoriesModel } from '@models'

export const categoryRouter = Router()

categoryRouter
  .get('/', paginationHandler<ICategory>(CategoriesModel), getCategories)
  .get('/:id', getCategory)
  .post('/', addCategory)
  .put('/:id', updateCategory)
  .delete('/:id', deleteCategory)
