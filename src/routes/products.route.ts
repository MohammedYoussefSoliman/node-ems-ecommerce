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
  updateProductValidator,
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
          .limit(limit)
          .skip(skip)
          .exec()
    ),
    getProducts
  )
  .get('/:id', ...getProductValidators, getProduct)
  .post('/', ...createProductValidators, addProduct)
  .put('/:id', ...updateProductValidator, updateProduct)
  .delete('/:id', ...deleteProductValidators, deleteProduct)
