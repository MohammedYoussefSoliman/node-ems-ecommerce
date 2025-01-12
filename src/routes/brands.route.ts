import { Router } from 'express'

import {
  addBrand,
  getBrand,
  getBrands,
  deleteBrand,
  updateBrand,
} from '@controllers'
import { IGeneral } from 'types'
import { queryHandler, uploadImage, processSingleImage } from '@middleware'
import { BrandsModel } from '@models'
import {
  getCategoryValidators,
  deleteCategoryValidators,
  createCategoryValidators,
  updateCategoryValidator,
} from '@validators'

export const brandsRouter = Router()

brandsRouter
  .get('/', queryHandler<IGeneral>(BrandsModel), getBrands)
  .get('/:id', ...getCategoryValidators, getBrand)
  .post(
    '/',
    ...createCategoryValidators,
    uploadImage,
    processSingleImage('brands'),
    addBrand
  )
  .put(
    '/:id',
    ...updateCategoryValidator,
    uploadImage,
    processSingleImage('brands'),
    updateBrand
  )
  .delete('/:id', ...deleteCategoryValidators, deleteBrand)
