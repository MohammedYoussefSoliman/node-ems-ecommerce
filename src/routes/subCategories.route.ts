import { Router } from 'express'

import {
  addSubCategory,
  getCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from '@controllers'
import { ISubCategory } from 'types'
import { queryHandler } from '@middleware'
import { SubCategoriesModel } from '@models'
import {
  getSubCategoryValidators,
  deleteSubCategoryValidators,
  createSubCategoryValidators,
} from '@validators'

export const subCategoryRouter = Router({ mergeParams: true })

subCategoryRouter
  .get('/', queryHandler<ISubCategory>(SubCategoriesModel), getCategories)
  .get('/:id', ...getSubCategoryValidators, getSubCategory)
  .post('/', ...createSubCategoryValidators, addSubCategory)
  .put('/:id', ...getSubCategoryValidators, updateSubCategory)
  .delete('/:id', ...deleteSubCategoryValidators, deleteSubCategory)
