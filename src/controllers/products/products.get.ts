import { ProductsModel } from '@models'
import { IProduct } from '@types'
import { getFactory, getSingleFactory } from '@utils'

export const getProducts = getFactory()

export const getProduct = getSingleFactory<IProduct>(ProductsModel)
