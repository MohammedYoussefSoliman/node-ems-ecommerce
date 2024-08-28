import { Router } from 'express'

import {
  addBrand,
  getBrand,
  getBrands,
  deleteBrand,
  updateBrand,
} from '@controllers'
import { IGeneral } from 'types'
import { paginationHandler } from '@middleware'
import { BrandsModel } from '@models'
import {
  getCategoryValidators,
  deleteCategoryValidators,
  createCategoryValidators,
} from '@validators'

export const brandsRouter = Router()

brandsRouter
  .get('/', paginationHandler<IGeneral>(BrandsModel), getBrands)
  .get('/:id', ...getCategoryValidators, getBrand)
  .post('/', ...createCategoryValidators, addBrand)
  .put('/:id', ...getCategoryValidators, updateBrand)
  .delete('/:id', ...deleteCategoryValidators, deleteBrand)
