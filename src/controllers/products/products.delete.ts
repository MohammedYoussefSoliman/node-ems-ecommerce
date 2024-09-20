import { IProduct } from '@types'
import { deleteFactory } from '@utils'
import { ProductsModel } from '@models'

export const deleteProduct = deleteFactory<IProduct>(ProductsModel)
