import { Router } from 'express'

import {
  addProduct,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from '@controllers'
import { IProduct } from 'types'
import { paginationHandler } from '@middleware'
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
    paginationHandler<IProduct>(ProductsModel, (model, limit, skip) =>
      model
        .find()
        .populate('category', 'name')
        .populate('brand', 'name')
        .populate('subCategory', 'name')
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
