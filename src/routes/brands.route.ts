import { Router } from 'express'

import {
  addBrand,
  getBrand,
  getBrands,
  deleteBrand,
  updateBrand,
} from '@controllers'
import { IGeneral } from 'types'
import { queryHandler } from '@middleware'
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
  .post('/', ...createCategoryValidators, addBrand)
  .put('/:id', ...updateCategoryValidator, updateBrand)
  .delete('/:id', ...deleteCategoryValidators, deleteBrand)
