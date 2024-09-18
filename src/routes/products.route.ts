import { Router } from 'express'

import {
  addProduct,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from '@controllers'
import { IProduct } from 'types'
import { queryHandler } from '@middleware'
import { ProductsModel } from '@models'
import {
  getProductValidators,
  deleteProductValidators,
  createProductValidators,
} from '@validators'

export const productsRouter = Router()

productsRouter
  .get(
    '/',
    queryHandler<IProduct>(
      ProductsModel,
      (model, limit, skip, filteredOptions) =>
        model
          .find({ ...filteredOptions.filter, ...filteredOptions.search })
          .sort(filteredOptions.sort)
          .select(filteredOptions.select)
          .populate('category', 'name')
          .populate('brand', 'name')
          .populate('subCategories', 'name')
          .limit(limit)
          .skip(skip)
          .exec()
    ),
    getProducts
  )
  .get('/:id', ...getProductValidators, getProduct)
  .post('/', ...createProductValidators, addProduct)
  .put('/:id', ...getProductValidators, updateProduct)
  .delete('/:id', ...deleteProductValidators, deleteProduct)
