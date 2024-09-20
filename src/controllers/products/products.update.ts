import { IProduct } from '@types'
import { ProductsModel } from '@models'
import { updateFactory } from '@utils'

export const updateProduct = updateFactory<IProduct>(ProductsModel)
