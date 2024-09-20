import { ProductsModel } from '@models'
import { IProduct } from '@types'
import { createFactory } from '@utils'

export const addProduct = createFactory<IProduct>(ProductsModel)
