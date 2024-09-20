import { IGeneral } from '@types'
import { updateFactory } from '@utils'
import { BrandsModel } from '@models'

export const updateBrand = updateFactory<IGeneral>(BrandsModel)
