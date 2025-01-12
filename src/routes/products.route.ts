import { Router } from 'express'

import {
  addProduct,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from '@controllers'
import { IProduct } from 'types'
import { queryHandler, uploadMixFields, processMixImage } from '@middleware'
import { ProductsModel } from '@models'
import {
  getProductValidators,
  deleteProductValidators,
  createProductValidators,
  updateProductValidator,
} from '@validators'

export const productsRouter = Router()

const fileFields = [
  { name: 'images', maxCount: 10 },
  { name: 'coverImage', maxCount: 1 },
]

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
  .post(
    '/',
    uploadMixFields(fileFields),
    processMixImage(fileFields, 'products'),
    ...createProductValidators,
    addProduct
  )
  .put(
    '/:id',
    uploadMixFields(fileFields),
    processMixImage(fileFields, 'products'),
    ...updateProductValidator,
    updateProduct
  )
  .delete('/:id', ...deleteProductValidators, deleteProduct)
