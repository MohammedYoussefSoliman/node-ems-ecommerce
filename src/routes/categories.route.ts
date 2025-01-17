import { Router } from 'express'
import { uploadImage, processSingleImage } from '@middleware'
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
import { queryHandler, adjustAddSubCategoryMiddleware } from '@middleware'
import { CategoriesModel } from '@models'
import {
  getCategoryValidators,
  deleteCategoryValidators,
  createCategoryValidators,
  updateCategoryValidator,
} from '@validators'

export const categoryRouter = Router()

categoryRouter
  .get(
    '/',
    queryHandler<ICategory>(
      CategoriesModel,
      (model, limit, skip, filteredOptions) =>
        model
          .find({ ...filteredOptions.filter, ...filteredOptions.search })
          .sort(filteredOptions.sort)
          .select(filteredOptions.select)
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
  .post(
    '/',
    uploadImage,
    processSingleImage('categories'),
    ...createCategoryValidators,
    addCategory
  )
  .put(
    '/:id',
    uploadImage,
    processSingleImage('categories'),
    ...updateCategoryValidator,
    updateCategory
  )
  .delete('/:id', ...deleteCategoryValidators, deleteCategory)
