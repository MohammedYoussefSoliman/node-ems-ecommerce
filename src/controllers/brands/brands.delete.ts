import { IGeneral } from '@types'
import { deleteFactory } from '@utils'
import { BrandsModel } from '@models'

export const deleteBrand = deleteFactory<IGeneral>(BrandsModel)
